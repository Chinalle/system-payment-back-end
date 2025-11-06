import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateQuotationRequestDto {
  @ApiProperty({ name: 'serviceId' })
  @IsUUID()
  serviceId: string;

  @ApiProperty({ name: 'ClientId' })
  @IsUUID()
  clientId: string;

  @ApiProperty({ name: 'clientNotes' })
  @IsString()
  @IsOptional()
  clientNotes: string;
}