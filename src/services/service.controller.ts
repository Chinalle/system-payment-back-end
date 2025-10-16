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
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { ServicesService } from './service.service';
import { CreateServiceDto } from '../dtos/service/create-service.dto';
import { ServicesDTO } from 'src/dtos/service/service.dto';

@ApiTags('Services')
@Controller('services')
export class ServiceController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiCreatedResponse({
    type: ServicesDTO,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createServiceDto: CreateServiceDto) {
    // return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.servicesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto) {
    // return this.servicesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.servicesService.remove(id);
  }
}
