import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { CreateServiceDto } from 'src/dtos/services/create-service.dto';
import { Services } from 'src/entities/services.entity';
import { Repository } from 'typeorm';
import type { IServicesRepository } from './services.repository.interface';

@Injectable()
export class ServiceRepository implements IServicesRepository {
  constructor(
    @InjectRepository(Services)
    private readonly serviceRepository: Repository<Services>,
  ) {}

  async findAllServices(): Promise<Services[]> {
    return this.serviceRepository.find();
  }

  async findAll(companyId: string): Promise<Services[]> {
    return this.serviceRepository.find({
      where: {
        companyId: companyId,
      },
    });
  }
  async findById(
    serviceId: string,
    companyId: string,
  ): Promise<Services | null> {
    return this.serviceRepository.findOne({
      where: {
        id: serviceId,
        companyId: companyId,
      },
    });
  }
  async create(serviceDto: CreateServiceDto): Promise<Services> {
    const service = this.serviceRepository.create(serviceDto);
    console.log('created service object', service);

    return await this.serviceRepository.save(service);
  }
}
