import type { CreateServiceDto } from 'src/dtos/services/create-service.dto';
import type { Service } from 'src/entities/services.entity';

export interface IServicesRepository {
  findAll(companyId: string): Promise<Service[]>;
  findById(serviceId: string, companyId: string): Promise<Service | null>;
  create(service: CreateServiceDto): Promise<Service>;
}
