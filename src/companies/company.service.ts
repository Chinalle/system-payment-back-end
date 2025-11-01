import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { Company } from 'src/entities/company.entity';
import { v4 as uuidv4 } from 'uuid';
import type { ICompanyRepository } from './repository/company.repository.interface';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async create(companyDto: CreateCompanyDto) {
    console.log('companyService: create', companyDto);

    const companyWithSameCnpj = await this.companyRepository.findByCnpj(
      companyDto.cnpj,
    );

    if (companyWithSameCnpj) {
      throw new Error('Company with same CPNJ already created');
    }

    // TODO: Add fields validations
    const companyData = {
      id: uuidv4(),
      name: companyDto.name,
      cnpj: companyDto.cnpj,
      description: companyDto.description,
      logoImg: companyDto.logoImg,
      businessHours: companyDto.businessHours,
      stripeAccountId: companyDto.stripeAccountId,
    };

    const savedCompany = await this.companyRepository.create(companyData);

    console.log('savedCompany: ', savedCompany);

    return savedCompany;
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.findAll();
  }

  async findById(companyId: string): Promise<Company> {
    const existingCompany = await this.companyRepository.findById(companyId);

    if (!existingCompany) {
      throw new NotFoundException('Company Not Found');
    }

    return existingCompany;
  }

  async updateStripeAccountId(companyId: string, acc: string) {
    await this.companyRepository.updateStripeAccountId(companyId, acc);
  }
}
