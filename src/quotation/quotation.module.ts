import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { QuotationEntity } from 'src/entities/quotation.entity';
import { QuotationController } from './quotation.controller';
import { QuotationService } from './quotation.service';
import { QuotationRepository } from './repository/quotation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuotationEntity]), AuthModule],
  controllers: [QuotationController],
  exports: [QuotationService, 'IQuotationRepository'],
  providers: [
    QuotationService,
    {
      provide: 'IQuotationRepository',
      useClass: QuotationRepository,
    },
  ],
})
export class QuotationModule {}
