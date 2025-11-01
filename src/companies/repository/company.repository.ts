import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { UpdatedCompanyDto } from 'src/dtos/company/update-company.dto';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import type { ICompanyRepository } from './company.repository.interface';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findByName(name: string) {
    return await this.companyRepository.findOneBy({ name: name });
  }
  async update(updateCompanyDto: UpdatedCompanyDto): Promise<Company> {
    return await this.companyRepository.save(updateCompanyDto);
  }
  async updateStripeAccountId(companyId: string, acc: string): Promise<void> {
    await this.companyRepository.update(
      { id: companyId },
      {
        stripeAccountId: acc,
      },
    );
  }
<<<<<<< HEAD
=======

>>>>>>> 0940dc5 (feat: add create onboarding link company method)
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
      relations: ['addresses'],
      relations: ['addresses'],
    });
  }
}
