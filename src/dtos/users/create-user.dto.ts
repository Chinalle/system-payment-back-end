import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @MinLength(8)
  passowrd: string;

  @ApiProperty()
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsOptional()
  adress: string;

  @ApiProperty()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
