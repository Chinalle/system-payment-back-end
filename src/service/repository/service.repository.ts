import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../../entities/service.entity';
import { CreateServiceDto } from '../../dtos/service/create-service.dto';
import { UpdateServiceDto } from '../../dtos/service/update-service.dto';
import { ServiceDTO } from 'src/dtos/service/service.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ServiceRepository {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async createService(createServiceDTO: CreateServiceDto): Promise<ServiceDTO> {
    const serviceData = {
      id: uuidv4(),
      name: createServiceDTO.serviceName,
      description: createServiceDTO.description,
      category: createServiceDTO.category,
      estimatedDuration: createServiceDTO.estimatedDurationInMinutes,
    };

    const service = this.serviceRepository.create(serviceData);
    const saveService = await this.serviceRepository.save(service);

    return this.mapEntityToDTO(saveService);
  }

  private mapEntityToDTO(serviceEntity: Service): ServiceDTO {
    return {
      id: serviceEntity.id,
      name: serviceEntity.serviceName,
      description: serviceEntity.description,
      category: serviceEntity.category,
      estimatedDuration: serviceEntity.estimatedDurationMinutes,
      createdAt: serviceEntity.createdAt as Date,
      updatedAt: serviceEntity.updatedAt as Date,
    };
  }

  async findAll(): Promise<Service[]> {
    return this.serviceRepository.find();
  }

  async findOneById(id: string): Promise<Service | null> {
    return this.serviceRepository.findOne({ where: { id } });
  }

  async updateService(id: string, dto: UpdateServiceDto): Promise<Service> {
    const serviceToUpdate = await this.serviceRepository.preload({
      id: id,
      serviceName: dto.serviceName,
      description: dto.description,
      estimatedDurationMinutes: dto.estimatedDurationInMinutes,
      category: dto.category,
      images: dto.images,
      paymentOptions: dto.paymentOptions,
    });

    if (!serviceToUpdate) {
      throw new NotFoundException(`Service ID ${id} not found`);
    }

    return this.serviceRepository.save(serviceToUpdate);
  }

  async deleteById(id: string) {
    return this.serviceRepository.delete(id);
  }
}
