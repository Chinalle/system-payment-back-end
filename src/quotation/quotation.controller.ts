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
import { CreateQuotationDto } from 'src/dtos/quotation/create-quotation.dto';
import { QuotationtDto } from 'src/dtos/quotation/quotation.dto';
import { QuotationService } from './quotation.service';

@ApiTags('Quotation')
@Controller('quotation')
@ApiBearerAuth()
// @UseGuards(JwtRefreshGuard)
export class QuotationController {
  constructor(private readonly quotationReqService: QuotationService) {}

  @ApiBody({
    type: CreateQuotationDto,
  })
  @ApiCreatedResponse({
    type: QuotationtDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createQuotation: CreateQuotationDto) {
    await this.quotationReqService.create(createQuotation);
  }

  @ApiResponse({
    isArray: true,
    type: QuotationtDto,
  })
  @Get()
  async findAll() {
    return this.quotationReqService.findAll();
  }

  @ApiResponse({
    type: QuotationtDto,
  })
  @Get(':quotationId')
  async findById(@Param() quotationId: string) {
    return this.quotationReqService.findById(quotationId);
  }
}
