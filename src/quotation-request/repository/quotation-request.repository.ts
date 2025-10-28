import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuotationRequestDto } from 'src/dtos/quotation-request/create-quotation-request.dto';
import { QuotationRequest } from 'src/entities/enum';
import { QuotationRequestEntity } from 'src/entities/quotation-request.entity';
import { Repository } from 'typeorm';
import { IQuotationRequestRepository } from './quotation-request.repository.interface';

@Injectable()
export class QuotationRequestRepository implements IQuotationRequestRepository {
  constructor(
    @InjectRepository(QuotationRequestEntity)
    private readonly quotationRequestRepository: Repository<QuotationRequestEntity>,
  ) {}
  async create(
    quotationRequest: CreateQuotationRequestDto,
  ): Promise<QuotationRequestEntity> {
    const newQuotationRequest =
      this.quotationRequestRepository.create(quotationRequest);

    return await this.quotationRequestRepository.save(newQuotationRequest);
  }

  async findById(id: string): Promise<QuotationRequestEntity | null> {
    return await this.quotationRequestRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAll(status?: QuotationRequest): Promise<QuotationRequestEntity[]> {
    if (!status) {
      return await this.quotationRequestRepository.find();
    }
    return await this.quotationRequestRepository.find({
      where: {
        status: status,
      },
    });
  }
}
