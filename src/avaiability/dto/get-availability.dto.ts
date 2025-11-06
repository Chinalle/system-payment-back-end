import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class GetAvailabilityDto {
  @ApiProperty({
    description: 'The ID of the User (Provider) to check availability for.',
    example: 'a3ffb1c0-c841-4b9f-c6f9-07b7433a3a33',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The ID of the Service Pricing variant being requested (determines duration).',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @IsUUID()
  @IsNotEmpty()
  servicePricingId: string;

  @ApiProperty({
    description: 'The start date of the range to check, in YYYY-MM-DD format.',
    example: '2025-10-20',
  })
  @IsDateString({}, { message: 'Start date must be in YYYY-MM-DD format.' })
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'The end date of the range to check, in YYYY-MM-DD format.',
    example: '2025-10-26',
  })
  @IsDateString({}, { message: 'End date must be in YYYY-MM-DD format.' })
  @IsNotEmpty()
  endDate: string;
}