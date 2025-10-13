import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import type { Address } from 'src/entities/address.entity';
import { Role } from 'src/entities/enum';
import { CreateAddressDTO } from '../address/create-address.dto';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: String,
    example: 'johndoe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    example: 'hashedPassword',
  })
  @IsNotEmpty()
  passwordHash: string;

  @ApiProperty({
    example: '12/02/1111',
    description: 'User birthday',
    type: Date,
  })
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  cpf: string;

  @ApiProperty({
    type: [CreateAddressDTO],
    required: false,
    description: 'Lista de endereços do usuário',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDTO)
  addresses?: CreateAddressDTO[];

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty()
  @IsBoolean()
  isConfirmed: boolean;
}
