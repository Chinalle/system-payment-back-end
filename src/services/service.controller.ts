import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { ServicesService } from './service.service';
import { CreateServiceDto } from '../dtos/services/create-service.dto';
import { ServicesDTO } from 'src/dtos/services/service.dto';
import type { Service } from 'src/entities/services.entity';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiCreatedResponse({
    type: ServicesDTO,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    console.log('Objeto de entrada', createServiceDto);
    return await this.servicesService.create(createServiceDto);
  }

  @Get(':companyId')
  async findAll(
    @Param('companyId', ParseUUIDPipe) companyId: string,
  ): Promise<Service[]> {
    return await this.servicesService.findAllByCompanyId(companyId);
  }

  @Get(':companyId/:serviceId')
  async findOne(
    @Param('companyId') companyId: string,
    @Param('serviceId') serviceId: string,
  ) {
    console.log('params', {
      companyId,
      serviceId,
    });
    return await this.servicesService.findById(serviceId, companyId);
  }

  @Put(':serviceId')
  update(@Param('serviceId') serviceId: string, @Body() dto) {
    // return this.servicesService.update(id, dto);
  }

  @Delete(':serviceId')
  remove(@Param('serviceId') serviceId: string) {
    // return this.servicesService.remove(id);
  }
}
