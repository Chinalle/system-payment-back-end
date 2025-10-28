import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { Quotation } from 'src/entities/enum';

export class QuotationtDto {
  @ApiProperty({ name: 'id' })
  id: string;

  @ApiProperty({ name: 'requestId' })
  requestId: string;

  @ApiProperty({ name: 'providerId' })
  providerId: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'proposedPriceInCents', type: 'integer' })
  proposedPriceInCents: number;

  @ApiProperty({ name: 'estimatedDurationMinutes', type: 'integer' })
  estimatedDurationMinutes: number;

  @ApiProperty({ name: 'status', enumName: 'status', enum: Quotation })
  status: Quotation;

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
