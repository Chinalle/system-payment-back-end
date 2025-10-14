import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateAddressDTO {
  @ApiProperty({ example: 'Bobos street' })
  @IsString()
  @IsNotEmpty({ message: 'Street name must not be empty' })
  @Length(3, 255)
  street: string;

  @ApiProperty({ example: 'apartment 28' })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty({ example: '249' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 45)
  number: string;

  @ApiProperty({ example: 'Araras' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: '112266' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;
}
