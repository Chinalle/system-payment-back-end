import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IServicesRepository } from './repository/services.repository.interface';
import type { Service } from 'src/entities/services.entity';
import type { CreateServiceDto } from 'src/dtos/services/create-service.dto';
import { v4 as uuidv4 } from 'uuid';
import { CompanyService } from 'src/companies/company.service';

@Injectable()
export class ServicesService {
  constructor(
    @Inject('IServicesRepository')
    private readonly serviceRepository: IServicesRepository,

    //Services Dependencies
    private readonly companyService: CompanyService,
  ) {}

  async create(service: CreateServiceDto): Promise<Service> {
    const newServiceDto = {
      id: uuidv4(),
      name: service.name,
      description: service.description,
      companyId: service.companyId,
      categoryId: service.categoryId,
    };

    return await this.serviceRepository.create(newServiceDto);
  }

  async findAllByCompanyId(companyId: string): Promise<Service[]> {
    const existingCompany = await this.companyService.findById(companyId);

    // Só deve fazer a segunda operação no banco caso a empresa exista

    if (!existingCompany) {
      throw new NotFoundException('Company Not Found');
    }

    return this.serviceRepository.findAll(companyId);
  }

  // Fail-fast
  async findById(serviceId: string, companyId: string): Promise<Service> {
    const existingCompany = await this.companyService.findById(companyId);

    if (!existingCompany) {
      throw new NotFoundException('Company Not Found');
    }

    const foundService = await this.serviceRepository.findById(
      serviceId,
      companyId,
    );

    if (!foundService) {
      throw new NotFoundException(`Service with ID: ${serviceId} Not found`);
    }

    return foundService;
  }
}
