import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import type { CreateCompanyMemberDto } from 'src/dtos/company/create-company-member.dto';
import type { CompanyMember } from 'src/entities/company-member.entity';
import type { ICompanyMemberRepository } from './repository/company-member.interface';

@Injectable()
export class CompanyMemberService {
  constructor(
    @Inject('ICompanyMemberRepository')
    private readonly membersRepository: ICompanyMemberRepository,
  ) {}

  async create(
    companyMemberDto: CreateCompanyMemberDto,
  ): Promise<CompanyMember> {
    const memberDto = {
      id: uuidv4(),
      userId: companyMemberDto.userId,
      companyId: companyMemberDto.companyId,
      providerRole: companyMemberDto.providerRole,
    };

    return this.membersRepository.create(memberDto);
  }

  async findAllCompanyMembers(companyId: string): Promise<CompanyMember[]> {
    const companyMembers =
      await this.membersRepository.findAllCompanyMembers(companyId);
    return companyMembers;
  }

  async findCompanyMember(
    userId: string,
    companyId: string, 
  ): Promise<CompanyMember> {
    const member = await this.membersRepository.findCompanyMember(
      userId,
      companyId,
    );

    if (!member) {
      throw new NotFoundException(
        `Member with userId: ${userId} not found in company: ${companyId}`,
      );
    }

    return member;
  }
}
