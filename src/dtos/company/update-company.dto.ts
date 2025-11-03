import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDTO } from '../address/create-address.dto';
import { UpdateAddressDTO } from '../address/update-address.dto';

export class UpdatedCompanyDto {
  @ApiProperty({ example: 'Nexus' })
  @IsString({ message: 'Property name must be a string.' })
  @IsOptional()
  @MaxLength(45, { message: 'Property name must have up to 45 characters.' })
  name?: string;

  @ApiProperty({ example: '4546549875646' })
  @IsString({ message: 'Property CNPJ must be a string.' })
  @IsOptional()
  cnpj?: string;

  @ApiProperty({ example: 'blablabla' })
  @IsString({ message: 'Property description must be a string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'image logo' })
  @IsOptional()
  @IsUrl({}, { message: 'The image URL must be a valid URL.' })
  @IsString()
  logoImg?: string;

  @ApiProperty({
    type: 'object',
    properties: {
      monday: {
        type: 'boolean',
        example: true,
      },
      tuesday: {
        type: 'boolean',
        example: true,
      },
      wednesday: {
        type: 'boolean',
        example: true,
      },
      thursday: {
        type: 'boolean',
        example: true,
      },
      friday: {
        type: 'boolean',
        example: true,
      },
      saturday: {
        type: 'boolean',
        example: false,
      },
      sunday: {
        type: 'boolean',
        example: false,
      },
    },
  })
  @IsOptional()
  @IsObject({ message: 'Property businessHours must be an object.' })
  businessHours?: Record<string, any>;

  @ApiProperty({
    name: 'rating',
    type: Number,
  })
  @IsOptional()
  rating?: number;

  @ApiProperty({ example: 'acct_1SOTkVFbsgtDXle4' })
  @IsString()
  @IsOptional()
  stripeAccountId?: string;

  @ApiProperty({
    type: [CreateAddressDTO],
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDTO)
  addresses?: UpdateAddressDTO[];
}
