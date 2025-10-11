import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import type { Address } from 'src/entities/address.entity';
import { Role } from 'src/entities/enum';
import { Login } from 'src/entities/login.entity';

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
    example: 'john@example.com',
    description: 'User Phone Number',
  })
  phone: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User Birth Date',
  })
  birthDate: Date;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User login data',
    type: Login,
  })
  login: Login;

  @ApiProperty({
    example: '12345678901',
    description: 'User social ID',
  })
  @IsString()
  cpfCnpj: string;

  @ApiProperty({
    example: 'nowhere',
    description: 'User Adress',
  })
  address: Address;

  @ApiProperty({
    example: 'USER',
    description: 'User level access',
  })
  @IsEnum({
    type: Role,
  })
  role: Role;

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
