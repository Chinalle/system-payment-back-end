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
    description: 'Keep the session active for an extended period',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
