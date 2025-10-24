import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Param,
  UseGuards
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { RolesGuard } from '../auth/guards/roles.guard'; 
import { Roles } from '../auth/decorators/roles.decorator'; 
import { ProviderRoles } from '../auth/decorators/provider-roles.decorator'; 
import { Role, RoleProvider } from '../entities/enum'; 
import { CompanyService } from './company.service';
import { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { Company } from 'src/dtos/company/company.dto';

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
