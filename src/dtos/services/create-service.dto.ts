import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import type { Category } from 'src/entities/category.entity';
import type { Company } from 'src/entities/company.entity';

export class CreateServiceDto {
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
  requiresQuotation?: boolean;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Service company id',
  })
  @IsString()
  companyId: string;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'Service description',
  })
  @IsString()
  categoryId: string;
}
