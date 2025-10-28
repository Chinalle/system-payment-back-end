import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuotationDto } from 'src/dtos/quotation/create-quotation.dto';
import { QuotationEntity } from 'src/entities/quotation.entity';
import { v4 as uuidv4 } from 'uuid';
import type { IQuotationRepository } from './repository/quotation.repository.interface';
@Injectable()
export class QuotationService {
  constructor(
    @Inject('IQuotationRepository')
    private readonly quotationRepository: IQuotationRepository,
  ) {}

  async create(
    createQuotation: CreateQuotationDto,
  ): Promise<QuotationEntity | null> {
    const newQuotationReq = {
      id: uuidv4(),
      requestId: createQuotation.requestId,
      providerId: createQuotation.providerId,
      description: createQuotation.description,
      proposedPriceInCents: createQuotation.proposedPriceInCents,
      estimatedDurationMinutes: createQuotation.estimatedDurationMinutes,
      status: createQuotation.status,
    };

    const savedQuotationRequest =
      await this.quotationRepository.create(newQuotationReq);

    return savedQuotationRequest;
  }

  async findById(id: string): Promise<QuotationEntity> {
    const existingQuotation = await this.quotationRepository.findById(id);

    if (!existingQuotation) {
      throw new NotFoundException('Not Found');
    }

    return existingQuotation;
  }

  async findAll(): Promise<QuotationEntity[]> {
    return this.quotationRepository.findAll();
  }
}
