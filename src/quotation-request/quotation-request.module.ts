import { Module } from '@nestjs/common';
import { QuotationRequestRepository } from './repository/quotation-request.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotationRequestEntity } from 'src/entities/quotation-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuotationRequestEntity])],
  controllers: [],
  exports: [],
  providers: [
    {
      provide: 'IQuotationRequestRepository',
      useClass: QuotationRequestRepository,
    },
  ],
})
export class QuotationRequestModule {}
