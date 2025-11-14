import { ServicePricing } from 'src/entities/service-pricing.entity';
import { CreateServicePricingDto } from '../create-service-pricing.dto';

export interface IServicePricingRepository {

  create(dto: CreateServicePricingDto): Promise<ServicePricing>;

  findAll(): Promise<ServicePricing[]>;

  findById(id: string): Promise<ServicePricing | null>;

  findAllByServiceId(serviceId: string): Promise<ServicePricing[]>;
}