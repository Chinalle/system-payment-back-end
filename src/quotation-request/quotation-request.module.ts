import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { QuotationRequestEntity } from 'src/entities/quotation-request.entity';
import { QuotationRequestController } from './quotation-request.controller';
import { QuotationRequestService } from './quotation-request.service';
import { QuotationRequestRepository } from './repository/quotation-request.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuotationRequestEntity]), AuthModule],
  controllers: [QuotationRequestController],
  exports: [QuotationRequestService, 'IQuotationRequestRepository'],
  providers: [
    QuotationRequestService,
    {
      provide: 'IQuotationRequestRepository',
      useClass: QuotationRequestRepository,
    },
  ],
})
export class QuotationRequestModule {}
