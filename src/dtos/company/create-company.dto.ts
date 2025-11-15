import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Nexus' })
  @IsString({ message: 'Property name must be a string.' })
  @IsNotEmpty({ message: 'Property name must not be empty.' })
  name: string;

  @ApiProperty({ example: '4546549875646' })
  @IsString({ message: 'Property CNPJ must be a string.' })
  @IsNotEmpty({ message: 'Property CNPJ cannot be empty.' })
  cnpj: string;

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

  @ApiProperty({ example: '102030506080' })
  @IsString()
  stripeAccountId?: string;
}
