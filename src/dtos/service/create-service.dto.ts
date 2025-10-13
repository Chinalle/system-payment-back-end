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
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ServiceCategory } from 'src/entities/category.entity';
import { ServicesService } from 'src/service/service.service';
import { ServiceImage } from 'src/entities/service-image.entity';

class ServiceImageDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: true })
  @ValidateNested({ each: true })
  @Type(() => ServicesService)
  service: ServicesService;
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
  @ApiProperty({ name: 'service name ', type: String })
  @IsNotEmpty()
  @IsString()
  serviceName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Estimated duration in minutes' })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  estimatedDurationInMinutes: number;

  @ApiProperty()
  @Min(1)
  priceInCents: number;

  @ApiProperty({ type: ServiceCategory })
  @ValidateNested({ each: true })
  @Type(() => ServiceCategory)
  category: ServiceCategory;

  @ApiProperty({ type: [ServiceImage], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceImage)
  images?: ServiceImage[];

  @ApiProperty({ type: [ServicePaymentOptionDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServicePaymentOptionDto)
  paymentOptions?: ServicePaymentOptionDto[];
}
