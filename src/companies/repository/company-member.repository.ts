import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { CreateCompanyMemberDto } from 'src/dtos/company/create-company-member.dto';
import { CompanyMember } from 'src/entities/company-member.entity';
import type { ICompanyMemberRepository } from './company-member.interface';

@Injectable()
export class companyMemberRepository implements ICompanyMemberRepository {
  constructor(
    @InjectRepository(CompanyMember)
    private readonly companyMemberRepository: Repository<CompanyMember>,
  ) {}

  findAllCompanyMembers(companyId: string): Promise<CompanyMember[]> {
    return this.companyMemberRepository.find({
      where: {
        companyId: companyId,
      },
    });
  }

  async findCompanyMember(userId: string): Promise<CompanyMember | null> {
    return await this.companyMemberRepository.findOne({
      where: { userId },
      relations: ['company', 'user'],
    });
  }

  async create(memberDto: CreateCompanyMemberDto): Promise<CompanyMember> {
    return await this.companyMemberRepository.save(memberDto);
  }
}
