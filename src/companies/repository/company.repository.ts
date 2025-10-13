import { Injectable } from '@nestjs/common';
import type { ICompanyRepository } from './company.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import type { CreateCompanyDto } from 'src/dtos/company/create-company.dto';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(companyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyRepository.save(companyDto);
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    return await this.companyRepository.findOne({
      where: {
        cnpj: cnpj,
      },
    });
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }
}
