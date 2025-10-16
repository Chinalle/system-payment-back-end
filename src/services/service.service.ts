import { Inject, Injectable } from '@nestjs/common';
import type { IServicesRepository } from './repository/services.repository.interface';

@Injectable()
export class ServicesService {
  constructor(
    @Inject('IServicesRepository')
    private readonly serviceRepo: IServicesRepository,
  ) {}

  // async create(service: CreateServiceDto): Promise<ServiceDTO> {
  //   return this.serviceRepo.create(service);
  // }
}
