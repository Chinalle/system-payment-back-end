import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsObject,
  IsUrl,
  IsDateString,
} from 'class-validator';

export class Company {
  @ApiProperty({
    type: String,
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'unique id',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ example: '' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MaxLength(45, { message: 'O nome deve ter no máximo 45 caracteres.' })
  name: string;

  @ApiProperty({ example: '' })
  @IsString({ message: 'O CNPJ deve ser uma string.' })
  @IsNotEmpty({ message: 'O CNPJ não pode ser vazio.' }) // Você pode adicionar uma validação customizada para o formato do CNPJ aqui
  cnpj: string;

  @ApiProperty({ example: '' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'A descrição не pode ser vazia.' })
  description: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsUrl({}, { message: 'A URL da imagem do logo é inválida.' })
  @IsString()
  logoImg?: string;

  @ApiProperty({ example: '' })
  @IsOptional()
  @IsObject({ message: 'O horário de funcionamento deve ser um objeto.' })
  businessHours?: Record<string, any>;

  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  stripeAccountId: string;

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
