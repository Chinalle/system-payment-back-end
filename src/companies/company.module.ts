import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { CompanyRepository } from './repository/company.repository';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyMembersController } from './members.controller';
import { companyMemberRepository } from './repository/company-member.repository';
import { CompanyMember } from 'src/entities/company-member.entity';
import { CompanyMemberService } from './members.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyMember])],
  controllers: [CompanyController, CompanyMembersController],
  exports: [
    CompanyService,
    CompanyMemberService,
    'ICompanyRepository',
    'ICompanyMemberRepository',
  ],
  providers: [
    CompanyService,
    CompanyMemberService,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
    {
      provide: 'ICompanyMemberRepository',
      useClass: companyMemberRepository,
    },
  ],
})
export class CompanyModule {}
