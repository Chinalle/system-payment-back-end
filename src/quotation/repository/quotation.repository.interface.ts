import { CreateQuotationDto } from 'src/dtos/quotation/create-quotation.dto';
import { Quotation } from 'src/entities/enum';
import { QuotationEntity } from 'src/entities/quotation.entity';

export interface IQuotationRepository {
  create(quotation: CreateQuotationDto): Promise<QuotationEntity>;
  findById(id: string): Promise<QuotationEntity | null>;
  findAll(status?: Quotation): Promise<QuotationEntity[]>;
}
