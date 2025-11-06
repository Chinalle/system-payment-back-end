import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from '../entities/appointment.entity';
import { AvailabilityOverride } from '../entities/availability-override.entity';
import { Availability } from '../entities/availability.entity';
import { ServicePricing } from '../entities/service-pricing.entity';
import { CreateAvailabilityOverrideDto } from './dto/create-availability-override.dto';
import { GetAvailabilityDto } from './dto/get-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { AvailabilityRepository } from './repository/availability.repository';

@Injectable()
export class AvailabilityService {
  constructor(
    private readonly availabilityRepository: AvailabilityRepository,
    @InjectRepository(ServicePricing)
    private readonly servicePricingRepository: Repository<ServicePricing>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Availability)
    private readonly availabilityRepo: Repository<Availability>,
    @InjectRepository(AvailabilityOverride)
    private readonly overrideRepo: Repository<AvailabilityOverride>,
  ) { }

  async updateWeeklyAvailability(
    userId: string,
    updateDto: UpdateAvailabilityDto,
  ): Promise<{ message: string }> {
    return this.availabilityRepository.updateWeeklyAvailability(
      userId,
      updateDto.availability,
    );
  }

  async createOrUpdateOverride(
    userId: string,
    overrideDto: CreateAvailabilityOverrideDto,
  ): Promise<AvailabilityOverride> {
    return this.availabilityRepository.createOrUpdateOverride(userId, overrideDto);
  }

  async getAvailability(queryDto: GetAvailabilityDto): Promise<{ availableSlots: { date: string; slots: string[] }[] }> {
    const { userId, servicePricingId, startDate, endDate } = queryDto;

    const servicePricing = await this.servicePricingRepository.findOneBy({ id: servicePricingId });
    if (!servicePricing || !servicePricing.durationInMinutes) {
      throw new NotFoundException(`Service pricing with ID ${servicePricingId} not found or has no duration.`);
    }
    const serviceDuration = servicePricing.durationInMinutes;

    const standardAvailability = await this.availabilityRepo.find({
      where: { user: { id: userId } },
      relations: ['breaks'],
    });

    const overrides = await this.overrideRepo.find({
      where: {
        user: { id: userId },
        overrideDate: Between(startDate, endDate)
      },
    });

    const existingAppointments = await this.appointmentRepository.find({
      where: {
        provider: { id: userId },
        startTime: LessThanOrEqual(new Date(endDate + 'T23:59:59.999Z')),
        endTime: MoreThanOrEqual(new Date(startDate + 'T00:00:00.000Z')),
        status: In([AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED]),
      },
      order: {
        startTime: 'ASC',
      }
    });

    const availableSlotsByDay: { date: string; slots: string[] }[] = [];
    const currentDate = new Date(Date.UTC(
      parseInt(startDate.substring(0, 4)),
      parseInt(startDate.substring(5, 7)) - 1,
      parseInt(startDate.substring(8, 10))
    ));
    const lastDate = new Date(Date.UTC(
      parseInt(endDate.substring(0, 4)),
      parseInt(endDate.substring(5, 7)) - 1,
      parseInt(endDate.substring(8, 10))
    ));


    while (currentDate <= lastDate) {
      const dayStr = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const dayOfWeek = currentDate.getUTCDay(); // 0 = Sunday, 1 = Monday...

      const workHours: { start: string; end: string }[] = [];
      const busySlots: { start: string; end: string }[] = [];

      const override = overrides.find(o => o.overrideDate === dayStr);
      if (override) {
        if (override.isAvailable && override.startTime && override.endTime) {
          workHours.push({ start: override.startTime, end: override.endTime });
        }
      } else {
        const standardDay = standardAvailability.find(a => a.dayOfWeek === dayOfWeek);
        if (standardDay && standardDay.isAvailable && standardDay.startTime && standardDay.endTime) {
          workHours.push({ start: standardDay.startTime, end: standardDay.endTime });
          standardDay.breaks?.forEach(b => {
            if (b.startTime && b.endTime) {
              busySlots.push({ start: b.startTime, end: b.endTime });
            }
          });
        }
      }

      existingAppointments.forEach(appt => {
        const apptStart = new Date(appt.startTime);
        const apptEnd = new Date(appt.endTime);
        if (apptStart.toISOString().split('T')[0] === dayStr) {
          const start = apptStart.toISOString().substring(11, 16);
          const end = apptEnd.toISOString().substring(11, 16);
          busySlots.push({ start, end });
        }
      });

      const daySlots = this.generateSlots(workHours, busySlots, serviceDuration);
      if (daySlots.length > 0) {
        availableSlotsByDay.push({ date: dayStr, slots: daySlots });
      }

      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return { availableSlots: availableSlotsByDay };
  }

  private generateSlots(workHours: { start: string; end: string }[], busySlots: { start: string; end: string }[], duration: number): string[] {
    const slots: string[] = [];
    const interval = 30;

    const timeToMinutes = (time: string | null): number | null => {
      if (!time) return null;
      const parts = time.split(':');

      if (parts.length < 2) return null;

      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);

      if (isNaN(hours) || isNaN(minutes)) return null;

      return hours * 60 + minutes;
    };

    const workIntervals = workHours
      .map(wh => ({ start: timeToMinutes(wh.start), end: timeToMinutes(wh.end) }))
      .filter(interval => interval.start !== null && interval.end !== null && interval.end > interval.start) as { start: number; end: number }[]; // Filtrar intervalos inválidos

    const busyIntervals = busySlots
      .map(bs => ({ start: timeToMinutes(bs.start), end: timeToMinutes(bs.end) }))
      .filter(interval => interval.start !== null && interval.end !== null && interval.end > interval.start) as { start: number; end: number }[]; // Filtrar intervalos inválidos
    busyIntervals.sort((a, b) => a.start - b.start);

    for (const workInterval of workIntervals) {
      for (let time = workInterval.start; time <= workInterval.end - duration; time += interval) {
        const slotStart = time;
        const slotEnd = time + duration;

        let isAvailable = true;

        if (slotEnd > workInterval.end) {
          isAvailable = false;
          continue;
        }

        for (const busy of busyIntervals) {
          if (slotStart < busy.end && slotEnd > busy.start) {
            isAvailable = false;
            break;
          }
        }

        if (isAvailable) {
          const hours = Math.floor(slotStart / 60).toString().padStart(2, '0');
          const minutes = (slotStart % 60).toString().padStart(2, '0');
          slots.push(`${hours}:${minutes}`);
        }
      }
    }
    return slots;
  }
}