import { CreateQuotationRequestDto } from 'src/dtos/quotation-request/create-quotation-request.dto';
import { QuotationRequestEntity } from '../../entities/quotation-request.entity';
import { QuotationRequest } from 'src/entities/enum';

export interface IQuotationRequestRepository {
  create(
    quotationRequest: CreateQuotationRequestDto,
  ): Promise<QuotationRequestEntity>;
  findById(id: string): Promise<QuotationRequestEntity | null>;
  findAll(status?: QuotationRequest): Promise<QuotationRequestEntity[]>;
}
