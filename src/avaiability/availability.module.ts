import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { AvailabilityRepository } from './repository/availability.repository';
import { Availability } from '../entities/availability.entity';
import { AvailabilityBreak } from '../entities/availability-break.entity';
import { AvailabilityOverride } from '../entities/availability-override.entity';
import { ServicePricing } from '../entities/service-pricing.entity'; 
import { Appointment } from '../entities/appointment.entity';      
import { AuthModule } from '../auth/auth.module';                 

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Availability,
      AvailabilityBreak,
      AvailabilityOverride,
      ServicePricing,
      Appointment,
    ]),
    AuthModule, 
  ],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AvailabilityRepository],
})
export class AvailabilityModule {}