import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServicesDTO } from 'src/dtos/services/service.dto';
import type { Services } from 'src/entities/services.entity';
import { CreateServiceDto } from '../dtos/services/create-service.dto';
import { ServicesService } from './service.service';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiCreatedResponse({
    type: ServicesDTO,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Services> {
    return await this.servicesService.create(createServiceDto);
  }

  @ApiResponse({
    isArray: true,
    type: ServicesDTO,
  })
  @Get('services')
  async findAllServices(): Promise<Services[]> {
    return await this.servicesService.findAllServices();
  }

  @ApiParam({
    name: 'companyId',
    description: 'Return all services from a company',
  })
  @Get(':companyId')
  async findAll(
    @Param('companyId', ParseUUIDPipe) companyId: string,
  ): Promise<Services[]> {
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

  // @Put(':serviceId')
  // async update(@Param('serviceId') serviceId: string, @Body() dto) {
  //   return await this.servicesService.update(id, dto);
  // }

  // @Delete(':serviceId')
  // remove(@Param('serviceId') serviceId: string) {
  //   // return this.servicesService.remove(id);
  // }
}
