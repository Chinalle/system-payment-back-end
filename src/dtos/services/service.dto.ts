import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import type { Category } from 'src/entities/category.entity';
import type { Company } from 'src/entities/company.entity';

export class ServicesDTO {
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
    example: true,
    description: 'True if needs quotation',
    default: false,
  })
  @IsBoolean()
  requires_quotation: boolean;

  @ApiProperty({
    example: true,
    description: 'True if the service is active on the company',
    default: true,
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: 'Service company',
    description: 'Service company',
  })
  company: Company;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Service company id',
  })
  @IsString()
  companyId: string;

  @ApiProperty({
    example: 'Service category',
    description: 'Service category',
  })
  category: Category;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Service description',
  })
  @IsString()
  categoryId: string;

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
