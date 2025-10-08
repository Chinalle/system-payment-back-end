import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import type { ServiceCategory } from 'src/entities/service-category.entity';

class ServiceImageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}

class ServicePaymentOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  condition: string;
}

export class CreateServiceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  category: ServiceCategory;

  @ApiProperty({ description: 'Estimated duration in minutes' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  estimatedDuration: number;

  @ApiProperty({ type: [ServiceImageDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceImageDto)
  images?: ServiceImageDto[];

  @ApiProperty({ type: [ServicePaymentOptionDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServicePaymentOptionDto)
  paymentOptions?: ServicePaymentOptionDto[];
}
