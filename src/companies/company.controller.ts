import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Company } from 'src/dtos/company/company.dto';
import { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { UpdatedCompanyDto } from 'src/dtos/company/update-company.dto';
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

  @ApiBody({
    type: UpdatedCompanyDto,
  })
  @ApiOkResponse({
    type: Company,
  })
  @Patch(':companyId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() updateCompany: UpdatedCompanyDto,
  ) {
    return await this.companyService.update(companyId, updateCompany);
  }

  @ApiParam({
    name: 'companyId',
  })
  @ApiOkResponse({
    type: Company,
  })
  @Get(':companyId')
  @HttpCode(HttpStatus.OK)
  async companyProfile(@Param('companyId', ParseUUIDPipe) companyId: string) {
    return await this.companyService.findById(companyId);
  }

  @ApiBody({
    type: UpdatedCompanyDto,
  })
  @ApiOkResponse({
    type: Company,
  })
  @Patch(':companyId')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() updateCompany: UpdatedCompanyDto,
  ) {
    return await this.companyService.update(companyId, updateCompany);
  }

  @ApiParam({
    name: 'companyId',
  })
  @ApiOkResponse({
    type: Company,
  })
  @Get(':companyId')
  @HttpCode(HttpStatus.OK)
  async companyProfile(@Param('companyId', ParseUUIDPipe) companyId: string) {
    return await this.companyService.findById(companyId);
  }

  @ApiCreatedResponse({
    type: Company,
  })
  @Get()
  async findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }
}
