import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsObject,
  IsUrl,
} from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Nexus' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MaxLength(45, { message: 'O nome deve ter no máximo 45 caracteres.' })
  name: string;

  @ApiProperty({ example: '4546549875646' })
  @IsString({ message: 'O CNPJ deve ser uma string.' })
  @IsNotEmpty({ message: 'O CNPJ não pode ser vazio.' })
  cnpj: string;

  @ApiProperty({ example: 'blablabla' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'image logo' })
  @IsOptional()
  @IsUrl({}, { message: 'A URL da imagem do logo é inválida.' })
  @IsString()
  logoImg?: string;

  @ApiProperty({ example: "{ monday: 'true'}" })
  @IsOptional()
  @IsObject({ message: 'O horário de funcionamento deve ser um objeto.' })
  businessHours?: Record<string, any>;

  @ApiProperty({ example: '102030506080' })
  @IsString()
  @IsNotEmpty()
  stripeAccountId: string;
}
