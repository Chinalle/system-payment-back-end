import { CreateQuotationRequestDto } from 'src/dtos/quotation-request/create-quotation-request.dto';
import { QuotationRequest } from 'src/entities/enum';
import { QuotationRequestEntity } from '../../entities/quotation-request.entity';

export interface IQuotationRequestRepository {
  create(
    quotationRequest: CreateQuotationRequestDto,
  ): Promise<QuotationRequestEntity>;
  findById(id: string): Promise<QuotationRequestEntity | null>;
  findAll(status?: QuotationRequest): Promise<QuotationRequestEntity[]>;
}
