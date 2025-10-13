import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsNumberString,
} from 'class-validator';
import type { ServiceCategory } from 'src/entities/category.entity';

export class ServiceDTO {
  @ApiProperty({
    type: String,
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'unique service id',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Service name',
    description: 'Service name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Service description',
    description: 'Service description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Service category',
    description: 'Service category',
  })
  category: ServiceCategory;

  @ApiProperty({
    example: '45',
    description: 'Service duration in minutes',
  })
  @IsNumberString()
  estimatedDuration: number;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Creation date',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Update date',
  })
  @IsDateString()
  updatedAt: Date;
}
