import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
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
    example: '1998-12-25',
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
    type: CreateAddressDTO,
    isArray: true,
    required: false,
    description: 'User adressses list',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDTO)
  addresses?: CreateAddressDTO[];

  @ApiProperty({
    enumName: 'role',
    enum: Role,
    examples: [Role.ADMIN, Role.CLIENT, Role.PROVIDER],
  })
  @IsEnum(Role)
  role: Role;
}
