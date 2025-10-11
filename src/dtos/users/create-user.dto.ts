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
import { Login } from 'src/entities/login.entity';
import { CreateAddressDTO } from '../address/create-address.dto';
import { LoginDto } from '../auth/login.dto';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User login data',
    type: LoginDto,
  })
  @ValidateNested()
  @Type(() => LoginDto)
  login: LoginDto;

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
  cpfCnpj: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested() // Valida o objeto de endereço aninhado
  @Type(() => CreateAddressDTO)
  address: Address;

  @ApiProperty()
  @IsEnum(Role)
  role: Role;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
