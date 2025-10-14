import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Address } from 'src/entities/address.entity';
import { Role } from 'src/entities/enum';

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
  })
  email: string;

  @ApiProperty({
    example: '12345678901',
    description: 'User social ID',
  })
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'User Adress',
    isArray: true,
    type: Address,
  })
  addresses: Address[];

  @ApiProperty({
    example: 'client | provider',
    description: 'User level access',
    enum: Role,
  })
  @IsEnum({
    type: Role,
  })
  role: Role;

  @ApiProperty({
    example: 'hex-dfadhfapoidsh57878',
    type: String,
    description: '',
  })
  resetPasswordToken: string | null;

  @ApiProperty({
    type: Date,
    description: '',
  })
  resetPasswordExpires: Date | null;

  @ApiProperty({
    example: true,
    description: 'Status to use soft delete',
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    example: true,
    description: 'confirmed by email link',
  })
  @IsBoolean()
  isConfirmed: boolean;

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
