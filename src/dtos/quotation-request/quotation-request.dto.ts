import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { QuotationRequest } from 'src/entities/enum';

export class QuotationRequestDto {
  @ApiProperty({ name: 'id' })
  id: string;

  @ApiProperty({ name: 'serviceId' })
  serviceId: string;

  @ApiProperty({ name: 'ClientId' })
  clientId: string;

  @ApiProperty({ name: 'clientNotes' })
  clientNotes: string;

  @ApiProperty({ name: 'status', enumName: 'status', enum: QuotationRequest })
  status: QuotationRequest;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Creation date',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Expired date',
  })
  @IsDateString()
  expiredAt: Date;
}
