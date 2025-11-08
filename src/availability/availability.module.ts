import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CompanyModule } from '../companies/company.module';
import { Appointment } from '../entities/appointment.entity';
import { AvailabilityBreak } from '../entities/availability-break.entity';
import { AvailabilityOverride } from '../entities/availability-override.entity';
import { Availability } from '../entities/availability.entity';
import { ServicePricing } from '../entities/service-pricing.entity';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { AvailabilityRepository } from './repository/availability.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Availability,
      AvailabilityBreak,
      AvailabilityOverride,
      ServicePricing,
      Appointment,
    ]),
    CompanyModule,
    AuthModule,
  ],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, AvailabilityRepository],
})
export class AvailabilityModule {}
