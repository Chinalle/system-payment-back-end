import { ApiProperty } from '@nestjs/swagger';
import { Quotation } from 'src/entities/enum';
import { IsString, IsUUID, IsInt, Min } from 'class-validator';

export class CreateQuotationDto {

  @ApiProperty()
  @IsUUID()
  requestId: string;

  @ApiProperty()
  @IsUUID()
  providerId: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  proposedPriceInCents: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  estimatedDurationMinutes: number;
}
