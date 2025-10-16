import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from './service.controller';
import { ServicesService } from './service.service';
import { ServiceRepository } from './repository/service.repository';
import { Service } from 'src/entities/services.entity';
import { Category } from 'src/entities/category.entity';
import { CategoryRepository } from './category/repository/category.repository';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service, Category])],
  controllers: [ServiceController, CategoryController],
  exports: [
    ServicesService,
    CategoryService,
    'IServicesRepository',
    'ICategoryRepository',
  ],
  providers: [
    ServicesService,
    CategoryService,
    {
      provide: 'IServicesRepository',
      useClass: ServiceRepository,
    },
    {
      provide: 'ICategoryRepository',
      useClass: CategoryRepository,
    },
  ],
})
export class ServiceModule {}
