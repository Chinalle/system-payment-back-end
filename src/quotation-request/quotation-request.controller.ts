import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateQuotationRequestDto } from 'src/dtos/quotation-request/create-quotation-request.dto';
import { QuotationRequestDto } from 'src/dtos/quotation-request/quotation-request.dto';
import { QuotationRequestEntity } from 'src/entities/quotation-request.entity';
import { QuotationRequestService } from './quotation-request.service';

@ApiTags('Quotation Request')
@Controller('quotation-request')
@ApiBearerAuth()
// @UseGuards(JwtRefreshGuard)
export class QuotationRequestController {
  constructor(private readonly quotationReqService: QuotationRequestService) {}

  @ApiBody({
    type: CreateQuotationRequestDto,
  })
  @ApiCreatedResponse({
    type: QuotationRequestDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQuotationReq: CreateQuotationRequestDto) {
    await this.quotationReqService.create(createQuotationReq);
  }

  @ApiResponse({
    isArray: true,
    type: QuotationRequestDto,
  })
  @Get()
  async findAll(): Promise<QuotationRequestEntity[]> {
    return this.quotationReqService.findAll();
  }

  @ApiResponse({
    type: QuotationRequestDto,
  })
  @Get(':quotationRequestId')
  async findById(
    @Param() quotationRequestId: string,
  ): Promise<QuotationRequestEntity> {
    return this.quotationReqService.findById(quotationRequestId);
  }
}
