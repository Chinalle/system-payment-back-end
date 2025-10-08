import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import type { Address } from 'src/entities/address.entity';
import type { Role } from 'src/entities/enum';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  cpfCnpj: string;

  @ApiProperty()
  @IsOptional()
  address: Address;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
