import { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { Company } from 'src/entities/company.entity';

export interface ICompanyRepository {
  create(companyDto: CreateCompanyDto): Promise<Company>;
  findAll(): Promise<Company[]>;
  findByCnpj(cnpj: string): Promise<Company | null>;
}
