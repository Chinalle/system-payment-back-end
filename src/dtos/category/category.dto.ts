import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CategoryDto {
  @ApiProperty({
    type: String,
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User fullname',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User fullname',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    example: true,
    description: 'Status to use soft delete',
  })
  @IsBoolean()
  isActive: boolean;

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
