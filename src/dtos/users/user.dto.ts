import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserDTO {
  @ApiProperty({
    type: String,
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    description: 'unique user id',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User fullname',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'unique username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User Phone Number',
  })
  phone: string;

  @ApiProperty({
    example: '12345678901',
    description: 'User social ID',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    example: 'nowhere',
    description: 'User Adress',
  })
  @IsString()
  adress: string;

  @ApiProperty({
    example: 'USER',
    description: 'User level access',
  })
  @IsString()
  role: string;

  @ApiProperty({
    example: true,
    description: 'Status to use soft delete',
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Creation date',
  })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-15T10:30:00Z',
    description: 'Update date',
  })
  @IsDateString()
  updatedAt: Date;
}
