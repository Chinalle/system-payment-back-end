import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateLoginDTO {
  @ApiProperty({ name: 'email', required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  hashedPassword: string;
}
