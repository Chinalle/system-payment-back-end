import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Company } from 'src/dtos/company/company.dto';
import { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { CompanyService } from './company.service';

@ApiTags('Company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiCreatedResponse({
    type: Company,
  })
  @ApiBody({
    type: CreateCompanyDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() companyDto: CreateCompanyDto): Promise<Company> {
    console.log('controller', companyDto);
    return this.companyService.create(companyDto);
  }

  @ApiCreatedResponse({
    type: Company,
  })
  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }
}
