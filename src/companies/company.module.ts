import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { CompanyRepository } from './repository/company.repository';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  exports: [CompanyService, 'ICompanyRepository'],
  providers: [
    CompanyService,
    {
      provide: 'ICompanyRepository',
      useClass: CompanyRepository,
    },
  ],
})
export class CompanyModule {}
