import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: true,
    description: 'Manter a sessão ativa por um período extendido',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
