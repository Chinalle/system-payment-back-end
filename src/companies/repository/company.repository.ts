import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import type { ICompanyRepository } from './company.repository.interface';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async updateStripeAccountId(companyId: string, acc: string): Promise<void> {
    await this.companyRepository.update(
      { id: companyId },
      {
        stripeAccountId: acc,
      },
    );
  }

  async create(companyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyRepository.save(companyDto);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findByCnpj(cnpj: string): Promise<Company | null> {
    return await this.companyRepository.findOne({
      where: {
        cnpj: cnpj,
      },
    });
  }

  async findById(companyId: string): Promise<Company | null> {
    return await this.companyRepository.findOne({
      where: {
        id: companyId,
      },
    });
  }
}
