import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from 'src/dtos/company/create-company.dto';
import { UpdatedCompanyDto } from 'src/dtos/company/update-company.dto';
import { Address } from 'src/entities/address.entity';
import { Company } from 'src/entities/company.entity';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import type { ICompanyRepository } from './repository/company.repository.interface';

@Injectable()
export class CompanyService {
  constructor(
    @Inject('ICompanyRepository')
    private readonly companyRepository: ICompanyRepository,

    private readonly dataSource: DataSource,
  ) {}

  async create(companyDto: CreateCompanyDto) {
    console.log('companyService: create', companyDto);

    const companyWithSameCnpj = await this.companyRepository.findByCnpj(
      companyDto.cnpj,
    );

    if (companyWithSameCnpj) {
      throw new ConflictException(`Company with same  already created`);
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

    console.table(companyData);

    const savedCompany = await this.companyRepository.create(companyData);

    console.log('savedCompany: ', savedCompany);

    return savedCompany;
  }

  async update(
    companyId: string,
    updateCompanyDto: UpdatedCompanyDto,
  ): Promise<Company | null> {
    return this.dataSource.transaction(async (manager) => {
      const companyRepo = manager.getRepository(Company);
      const addressesRepo = manager.getRepository(Address);

      const existingCompany = await companyRepo.findOneBy({ id: companyId });

      if (!existingCompany) {
        throw new NotFoundException('Company Not Found');
      }

      if (updateCompanyDto.cnpj) {
        const companyWithSameCnpj = await companyRepo.findOneBy({
          cnpj: updateCompanyDto.cnpj,
        });

        if (
          companyWithSameCnpj &&
          companyWithSameCnpj.id !== existingCompany.id
        ) {
          throw new ConflictException(
            'Company with the same CNPJ already exists',
          );
        }
      }

      if (updateCompanyDto.name) {
        const companyWithSameName = await companyRepo.findOneBy({
          name: updateCompanyDto.name,
        });
        if (
          companyWithSameName &&
          companyWithSameName.id !== existingCompany.id
        ) {
          throw new ConflictException(
            'Company with the same name already exists',
          );
        }
      }

      const { addresses, ...companyData } = updateCompanyDto;

      Object.assign(existingCompany, companyData);

      await companyRepo.save(existingCompany);

      if (addresses) {
        if (addresses.length > 0) {
          const newAddressEntities = addresses.map((addrDto) => {
            return addressesRepo.create({
              ...addrDto,
              id: uuidv4(),
              company: existingCompany,
            });
          });
          await addressesRepo.save(newAddressEntities);
        }
      }
      return companyRepo.findOne({
        where: { id: companyId },
        relations: ['addresses'],
      });
    });
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
