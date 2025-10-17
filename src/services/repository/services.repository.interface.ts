import type { CreateServiceDto } from 'src/dtos/services/create-service.dto';
import type { Services } from 'src/entities/services.entity';

export interface IServicesRepository {
  findAll(companyId: string): Promise<Services[]>;
  findById(serviceId: string, companyId: string): Promise<Services | null>;
  create(service: CreateServiceDto): Promise<Services>;
}
