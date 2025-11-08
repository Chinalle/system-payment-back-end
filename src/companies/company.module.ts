import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyMember } from 'src/entities/company-member.entity';
import { Company } from 'src/entities/company.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyMembersController } from './members.controller';
import { CompanyMemberService } from './members.service';
import { companyMemberRepository } from './repository/company-member.repository';
import { CompanyRepository } from './repository/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyMember])],
  controllers: [CompanyController, CompanyMembersController],
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
  exports: [
    CompanyService,
    CompanyMemberService,
    'ICompanyRepository',
    'ICompanyMemberRepository',
  ],
})
export class CompanyModule {}
