import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'userId' })
  @IsNotEmpty()
  sub: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: '' })
  @IsString()
  refreshToken?: string;
}
