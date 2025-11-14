import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicePricing } from 'src/entities/service-pricing.entity';
import { ServiceModule } from '../service.module';
import { ServicePricingRepository } from './repository/service-pricing.repository';
import { ServicePricingController } from './service-pricing.controller';
import { ServicePricingService } from './service-pricing.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ServicePricing]),
        forwardRef(() => ServiceModule),
    ],
    controllers: [ServicePricingController],
    providers: [
        ServicePricingService,
        {
            provide: 'IServicePricingRepository',
            useClass: ServicePricingRepository,
        },
    ],
    exports: [ServicePricingService],
})
export class ServicePricingModule { }