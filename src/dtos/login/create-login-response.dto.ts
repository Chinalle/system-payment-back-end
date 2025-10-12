import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateLoginResponseDTO {
  @ApiProperty({ name: 'email' })
  @IsNotEmpty()
  @IsString()
  email: string;
}
