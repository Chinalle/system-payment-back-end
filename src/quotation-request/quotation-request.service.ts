import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuotationRequestDto } from 'src/dtos/quotation-request/create-quotation-request.dto';
import { QuotationRequestEntity } from 'src/entities/quotation-request.entity';
import { QuotationRequest } from 'src/entities/enum';
import { v4 as uuidv4 } from 'uuid';
import type { IQuotationRequestRepository } from './repository/quotation-request.repository.interface';

@Injectable()
export class QuotationRequestService {
  constructor(
    @Inject('IQuotationRequestRepository')
    private readonly quotationRequestRepository: IQuotationRequestRepository,
  ) { }

  async create(
    createQuotationReq: CreateQuotationRequestDto,
  ): Promise<QuotationRequestEntity | null> {
    const newQuotationReq = {
      id: uuidv4(),
      serviceId: createQuotationReq.serviceId,
      clientId: createQuotationReq.clientId,
      clientNotes: createQuotationReq.clientNotes,
      status: QuotationRequest.PENDING,
    };

    const savedQuotationRequest =
      await this.quotationRequestRepository.create(newQuotationReq);

    return savedQuotationRequest;
  }

  async findById(id: string): Promise<QuotationRequestEntity> {
    const existingQuotationRequest =
      await this.quotationRequestRepository.findById(id);

    if (!existingQuotationRequest) {
      throw new NotFoundException('Not Found');
    }

    return existingQuotationRequest;
  }

  async findAll(): Promise<QuotationRequestEntity[]> {
    return this.quotationRequestRepository.findAll();
  }
}
