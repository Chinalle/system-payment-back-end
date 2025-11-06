import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateIf,
} from 'class-validator';

/**
 * DTO for creating or updating a specific date availability override
 * (e.g., a holiday, temporary block, or special working hours).
 * Corresponds to the 'availability_override' entity.
 */
export class CreateAvailabilityOverrideDto {
  @ApiProperty({
    description: 'The specific date for the override in YYYY-MM-DD format.',
    example: '2025-12-25',
  })
  @IsDateString({}, { message: 'Date must be in YYYY-MM-DD format.' }) // Valida o formato
  @IsNotEmpty()
  override_date: string; // Corresponde à coluna 'override_date'

  @ApiProperty({
    description:
      'Indicates if the provider is available on this specific date. If false, the entire day is blocked.',
    example: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  is_available: boolean; // Corresponde à coluna 'is_available'

  @ApiProperty({
    description:
      'A special start time for this day in HH:mm format. Required if is_available is true.',
    example: '10:00',
    required: false,
  })
  @ValidateIf((o) => o.is_available === true)
  @IsNotEmpty({ message: 'Start time cannot be empty when available.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Start time must be in HH:mm format' })
  start_time?: string; // Corresponde à coluna 'start_time'

  @ApiProperty({
    description:
      'A special end time for this day in HH:mm format. Required if is_available is true.',
    example: '14:00',
    required: false,
  })
  @ValidateIf((o) => o.is_available === true)
  @IsNotEmpty({ message: 'End time cannot be empty when available.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'End time must be in HH:mm format' })
  end_time?: string; // Corresponde à coluna 'end_time'

  @ApiProperty({
    description:
      'An optional description for the override (e.g., "Holiday", "Doctor Appointment").',
    example: 'Christmas Day',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string; // Corresponde à coluna 'description'
}