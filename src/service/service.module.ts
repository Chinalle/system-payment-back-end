import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '../entities/service.entity';
import { ServiceController } from './service.controller';
import { ServicesService } from './service.service';
import { ServiceRepository } from './repository/service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  controllers: [ServiceController],
  providers: [ServicesService, ServiceRepository],
})
export class ServiceModule { }
