// import { Injectable, NotFoundException } from '@nestjs/common';
// import { ServiceRepository } from './repository/service.repository';
// import { CreateServiceDto } from '../dtos/service/create-service.dto';
// import { UpdateServiceDto } from '../dtos/service/update-service.dto';
// import { ServiceDTO } from 'src/dtos/service/service.dto';
// import type { Service } from 'src/entities/services.entity';

// @Injectable()
// export class ServicesService {
//   constructor(private readonly serviceRepo: ServiceRepository) {}

//   async create(service: CreateServiceDto): Promise<ServiceDTO> {
//     return this.serviceRepo.createService(service);
//   }

//   async findAll(): Promise<Service[]> {
//     return this.serviceRepo.findAll();
//   }

//   async findOne(id: string): Promise<Service> {
//     const service = await this.serviceRepo.findOneById(id);
//     if (!service) {
//       throw new NotFoundException(`Service ID ${id} not found`);
//     }
//     return service;
//   }

//   async update(id: string, dto: UpdateServiceDto): Promise<Service> {
//     return this.serviceRepo.updateService(id, dto);
//   }

//   async remove(id: string): Promise<void> {
//     const result = await this.serviceRepo.deleteById(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Service ID ${id} not found`);
//     }
//   }
// }
