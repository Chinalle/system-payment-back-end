import { ApiProperty } from '@nestjs/swagger';
import { QuotationRequest } from 'src/entities/enum';

export class CreateQuotationRequestDto {
  @ApiProperty({ name: 'serviceId' })
  serviceId: string;

  @ApiProperty({ name: 'ClientId' })
  clientId: string;

  @ApiProperty({ name: 'clientNotes' })
  clientNotes: string;

  @ApiProperty({ name: 'status', enumName: 'status', enum: QuotationRequest })
  status: QuotationRequest;
}
