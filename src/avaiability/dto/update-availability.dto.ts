import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateIf,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class AvailabilityBreakDto {
  @ApiProperty({ description: 'Name of the break (e.g., Lunch)', example: 'Lunch' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Start time of the break in HH:mm format', example: '12:00' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Start time must be in HH:mm format' })
  startTime: string;

  @ApiProperty({ description: 'End time of the break in HH:mm format', example: '13:00' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'End time must be in HH:mm format' })
  endTime: string;
}

export class AvailabilityDayDto {
  @ApiProperty({ description: 'Day of the week (0=Sunday, 1=Monday, ..., 6=Saturday)', example: 1 })
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @ApiProperty({ description: 'Indicates if the provider is available on this day', example: true })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    required: false,
    description: 'Work start time in HH:mm format. Required if isAvailable is true.',
    example: '09:00',
  })
  @ValidateIf((o) => o.isAvailable === true) 
  @IsNotEmpty({ message: 'Start time is required when available' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Start time must be in HH:mm format' })
  startTime?: string;

  @ApiProperty({
    required: false,
    description: 'Work end time in HH:mm format. Required if isAvailable is true.',
    example: '18:00',
  })
  @ValidateIf((o) => o.isAvailable === true) 
  @IsNotEmpty({ message: 'End time is required when available' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'End time must be in HH:mm format' })
  endTime?: string;

  @ApiProperty({
    type: [AvailabilityBreakDto],
    required: false,
    description: 'List of breaks during this day',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityBreakDto)
  breaks?: AvailabilityBreakDto[];
}

export class UpdateAvailabilityDto {
  @ApiProperty({
    type: [AvailabilityDayDto],
    description: 'Array containing the configuration for all 7 days of the week.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(7, { message: 'Must provide configuration for all 7 days of the week.' })
  @ArrayMaxSize(7, { message: 'Must provide configuration for only 7 days of the week.' })
  @Type(() => AvailabilityDayDto) 
  availability: AvailabilityDayDto[];
}