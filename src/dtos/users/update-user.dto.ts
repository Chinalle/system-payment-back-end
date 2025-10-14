import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsDateString,
  IsNotEmpty,
  IsString,
  IsOptional,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/entities/enum';
import { User } from 'src/entities/user.entity';
import { CreateAddressDTO } from '../address/create-address.dto';
import { UpdateAddressDTO } from '../address/update-address.dto';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    type: String,
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: String,
    example: 'hashedPassword123!',
  })
  @IsOptional()
  password?: string;

  @ApiProperty({
    example: '12/02/1111',
    description: 'User birthday',
    type: Date,
  })
  @IsDateString()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({
    type: [CreateAddressDTO],
    required: false,
    description: 'address user list',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDTO)
  addresses?: UpdateAddressDTO[];

  @ApiProperty()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

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
}
