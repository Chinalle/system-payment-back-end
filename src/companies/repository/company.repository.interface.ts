import { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { UpdatedCompanyDto } from 'src/dtos/company/update-company.dto';
import { Company } from 'src/entities/company.entity';
import { EntityManager } from 'typeorm';

export interface ICompanyRepository {
  create(companyDto: CreateCompanyDto): Promise<Company>;
  update(
    updateCompanyDto: UpdatedCompanyDto,
    manager?: EntityManager,
  ): Promise<Company>;
  findAll(): Promise<Company[]>;
  findById(companyId: string): Promise<Company | null>;
  findByCnpj(cnpj: string): Promise<Company | null>;
  findByName(name: string): Promise<Company | null>;
  updateStripeAccountId(companyID: string, acc: string): Promise<void>;
}
