import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  token: string;
}
