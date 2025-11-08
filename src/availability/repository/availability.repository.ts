import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { Availability } from '../../entities/availability.entity';
import { AvailabilityBreak } from '../../entities/availability-break.entity';
import { AvailabilityDayDto } from '../dto/update-availability.dto';
import { User } from '../../entities/user.entity';
import { AvailabilityOverride } from '../../entities/availability-override.entity';
import { CreateAvailabilityOverrideDto } from '../dto/create-availability-override.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AvailabilityRepository {
  private readonly logger = new Logger(AvailabilityRepository.name);

  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(AvailabilityOverride)
    private readonly overrideRepo: Repository<AvailabilityOverride>,
  ) {}
  
  async updateWeeklyAvailability(
    userId: string,
    availabilityData: AvailabilityDayDto[],
  ): Promise<{ message: string }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const oldAvailability = await queryRunner.manager.find(Availability, {
        where: { user: { id: userId } },
        select: ['id'], 
      });

      if (oldAvailability.length > 0) {
        const oldAvailabilityIds = oldAvailability.map((a) => a.id);
        await queryRunner.manager.delete(AvailabilityBreak, {
          availability: { id: In(oldAvailabilityIds) },
        });
        await queryRunner.manager.delete(Availability, {
          id: In(oldAvailabilityIds),
        });
      }

      for (const day of availabilityData) {
        const newAvailabilityDay = queryRunner.manager.create(Availability, {
          dayOfWeek: day.dayOfWeek,
          isAvailable: day.isAvailable,
          startTime: day.isAvailable ? day.startTime : null,
          endTime: day.isAvailable ? day.endTime : null,
          user: { id: userId } as User, 
        });

        const savedDay = await queryRunner.manager.save(newAvailabilityDay);

        if (day.isAvailable && day.breaks && day.breaks.length > 0) {
          const newBreaks = day.breaks.map((breakDto) =>
            queryRunner.manager.create(AvailabilityBreak, {
              name: breakDto.name,
              startTime: breakDto.startTime,
              endTime: breakDto.endTime,
              availability: savedDay,
            }),
          );
          await queryRunner.manager.save(newBreaks);
        }
      }

      await queryRunner.commitTransaction();
      this.logger.log(`Successfully updated weekly availability for user ${userId}`);
      return { message: 'Weekly availability updated successfully.' };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Failed to update weekly availability for user ${userId}`, error.stack);
      throw new InternalServerErrorException('Failed to update weekly availability.');
    } finally {
      await queryRunner.release();
    }
  }
  async createOrUpdateOverride(
    userId: string,
    dto: CreateAvailabilityOverrideDto,
  ): Promise<AvailabilityOverride> {
    const existingOverride = await this.overrideRepo.findOne({
      where: {
        user: { id: userId },
        overrideDate: dto.override_date,
      },
    });

    if (existingOverride) {
      const updated = this.overrideRepo.merge(existingOverride, {
        isAvailable: dto.is_available,
        startTime: dto.is_available ? dto.start_time : null,
        endTime: dto.is_available ? dto.end_time : null,
        description: dto.description,
      });
      this.logger.log(`Updating override for user ${userId} on ${dto.override_date}`);
      return this.overrideRepo.save(updated);
    } else {
      const newOverride = this.overrideRepo.create({
        overrideDate: dto.override_date,
        isAvailable: dto.is_available,
        startTime: dto.is_available ? dto.start_time : null,
        endTime: dto.is_available ? dto.end_time : null,
        description: dto.description,
        user: { id: userId } as User,
      });
      this.logger.log(`Creating new override for user ${userId} on ${dto.override_date}`);
      return this.overrideRepo.save(newOverride);
    }
  }
}