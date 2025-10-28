import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuotationDto } from 'src/dtos/quotation/create-quotation.dto';
import { Quotation } from 'src/entities/enum';
import { QuotationEntity } from 'src/entities/quotation.entity';
import { Repository } from 'typeorm';
import { IQuotationRepository } from './quotation.repository.interface';

@Injectable()
export class QuotationRepository implements IQuotationRepository {
  constructor(
    @InjectRepository(QuotationEntity)
    private readonly quotationRepository: Repository<QuotationEntity>,
  ) {}
  async create(quotation: CreateQuotationDto): Promise<QuotationEntity> {
    const newQuotation = this.quotationRepository.create(quotation);

    return await this.quotationRepository.save(newQuotation);
  }

  async findById(id: string): Promise<QuotationEntity | null> {
    return await this.quotationRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findAll(status?: Quotation): Promise<QuotationEntity[]> {
    if (!status) {
      return await this.quotationRepository.find();
    }
    return await this.quotationRepository.find({
      where: {
        status: status,
      },
    });
  }
}
