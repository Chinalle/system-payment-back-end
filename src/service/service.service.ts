import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceRepository } from './repository/service.repository';
import { CreateServiceDto } from '../dtos/service/create-service.dto';
import { UpdateServiceDto } from '../dtos/service/update-service.dto';
import { ServiceEntity } from '../entities/service.entity';
import { ServiceDTO } from 'src/dtos/service/service.dto';

@Injectable()
export class ServicesService {
  constructor(
    private readonly serviceRepo: ServiceRepository,
  ) { }

  async create(service: CreateServiceDto): Promise<ServiceDTO> {
    return this.serviceRepo.createService(service);
  }

  async findAll(): Promise<ServiceEntity[]> {
    return this.serviceRepo.findAll();
  }

  async findOne(id: string): Promise<ServiceEntity> {
    const service = await this.serviceRepo.findOneById(id);
    if (!service) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }
    return service;
  }

  async update(id: string, dto: UpdateServiceDto): Promise<ServiceEntity> {
    return this.serviceRepo.updateService(id, dto);
  }

  async remove(id: string): Promise<void> {
    const result = await this.serviceRepo.deleteById(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }
  }
}