import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicePricing } from 'src/entities/service-pricing.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateServicePricingDto } from '../create-service-pricing.dto';
import { IServicePricingRepository } from './service-pricing.repository.interface';

@Injectable()
export class ServicePricingRepository implements IServicePricingRepository {
  constructor(
    @InjectRepository(ServicePricing)
    private readonly pricingRepository: Repository<ServicePricing>,
  ) { }

  async create(dto: CreateServicePricingDto): Promise<ServicePricing> {
    const newPricingData = {
      ...dto,
      id: uuidv4(),
      isActive: true,
    };

    const newPricing = this.pricingRepository.create(newPricingData);
    return this.pricingRepository.save(newPricing);
  }

  async findAll(): Promise<ServicePricing[]> {
    return this.pricingRepository.find();
  }

  async findById(id: string): Promise<ServicePricing | null> {
    return this.pricingRepository.findOneBy({ id });
  }

  async findAllByServiceId(serviceId: string): Promise<ServicePricing[]> {
    return this.pricingRepository.find({
      where: {
        serviceId: serviceId,
      },
    });
  }
}