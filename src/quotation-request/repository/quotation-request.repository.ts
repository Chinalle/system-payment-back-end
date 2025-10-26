import { Injectable } from '@nestjs/common';
import { IQuotationRequestRepository } from './quotation-request.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { QuotationRequestEntity } from 'src/entities/quotation-request.entity';
import { Repository } from 'typeorm';
import { CreateQuotationRequestDto } from 'src/dtos/quotation-request/create-quotation-request.dto';
import { QuotationRequest } from 'src/entities/enum';

@Injectable()
export class QuotationRequestRepository implements IQuotationRequestRepository {
  constructor(
    @InjectRepository(QuotationRequestEntity)
    private readonly quotationRequestRepository: Repository<QuotationRequestEntity>,
  ) {}
  async create(
    quotationRequest: CreateQuotationRequestDto,
  ): Promise<QuotationRequestEntity> {
    await console.log(quotationRequest);
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<QuotationRequestEntity | null> {
    await console.log(id);
    throw new Error('Method not implemented.');
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
