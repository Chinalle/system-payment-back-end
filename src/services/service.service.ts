import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyService } from 'src/companies/company.service';
import type { CreateServiceDto } from 'src/dtos/services/create-service.dto';
import type { Services } from 'src/entities/services.entity';
import { v4 as uuidv4 } from 'uuid';
import type { IServicesRepository } from './repository/services.repository.interface';

@Injectable()
export class ServicesService {
  constructor(
    @Inject('IServicesRepository')
    private readonly serviceRepository: IServicesRepository,

    //Services Dependencies
    private readonly companyService: CompanyService,
  ) {}

  async create(service: CreateServiceDto): Promise<Services> {
    const newServiceDto = {
      ...service,
      id: uuidv4(),
    };

    return await this.serviceRepository.create(newServiceDto);
  }

  async findAllByCompanyId(companyId: string): Promise<Services[]> {
    const existingCompany = await this.companyService.findById(companyId);

    // Só deve fazer a segunda operação no banco caso a empresa exista

    if (!existingCompany) {
      throw new NotFoundException('Company Not Found');
    }

    return this.serviceRepository.findAll(companyId);
  }

  // Fail-fast
  async findById(serviceId: string, companyId: string): Promise<Services> {
    const existingCompany = await this.companyService.findById(companyId);

    if (!existingCompany) {
      throw new NotFoundException('Company Not Found');
    }

    const foundService = await this.serviceRepository.findById(
      serviceId,
      companyId,
    );

    if (!foundService) {
      throw new NotFoundException(`Services with ID: ${serviceId} Not found`);
    }

    return foundService;
  }

  async findAllServices(): Promise<Services[]> {
    return this.serviceRepository.findAllServices();
  }
}
