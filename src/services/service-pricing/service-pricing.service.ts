import {
    Inject,
    Injectable,
    NotFoundException,
    forwardRef,
} from '@nestjs/common';
import { ServicePricing } from 'src/entities/service-pricing.entity';
import { ServicesService } from 'src/services/service.service';
import { CreateServicePricingDto } from './create-service-pricing.dto';
import type { IServicePricingRepository } from './repository/service-pricing.repository.interface';

@Injectable()
export class ServicePricingService {
    constructor(
        @Inject('IServicePricingRepository')
        private readonly pricingRepository: IServicePricingRepository,

        @Inject(forwardRef(() => ServicesService))
        private readonly servicesService: ServicesService,
    ) { }

    async create(dto: CreateServicePricingDto, companyId: string): Promise<ServicePricing> {

        await this.servicesService.findById(dto.serviceId, companyId);

        return this.pricingRepository.create(dto);
    }

    async findAll(): Promise<ServicePricing[]> {
        return this.pricingRepository.findAll();
    }

    async findAllByServiceId(serviceId: string, companyId: string): Promise<ServicePricing[]> {

        await this.servicesService.findById(serviceId, companyId);

        return this.pricingRepository.findAllByServiceId(serviceId);
    }

    async findById(id: string): Promise<ServicePricing> {
        const pricing = await this.pricingRepository.findById(id);
        if (!pricing) {
            throw new NotFoundException(`Service pricing with ID ${id} not found.`);
        }
        return pricing;
    }
}