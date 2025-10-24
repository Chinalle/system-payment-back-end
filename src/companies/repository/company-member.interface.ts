import type { CreateCompanyMemberDto } from 'src/dtos/company/create-company-member.dto';
import type { CompanyMember } from 'src/entities/company-member.entity';

export interface ICompanyMemberRepository {
  create(memberDto: CreateCompanyMemberDto): Promise<CompanyMember>;
  findAllCompanyMembers(companyId: string): Promise<CompanyMember[]>;
  findCompanyMember(userId: string, companyId: string): Promise<CompanyMember | null>;
}
