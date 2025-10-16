import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional, IsUUID } from 'class-validator';

export class UpdateAddressDTO {
  @ApiProperty({ example: 'UUID' })
  @IsUUID()
  @IsOptional()
  id: string;

  @ApiProperty({ example: 'Bobos street' })
  @IsString()
  @IsOptional()
  @Length(3, 255)
  street?: string;

  @ApiProperty({ example: 'apartment 28' })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty({ example: '249' })
  @IsString()
  @IsOptional()
  @Length(1, 45)
  number?: string;

  @ApiProperty({ example: 'Araras' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @IsOptional()
  @Length(2, 2)
  state?: string;

  @ApiProperty({ example: '112266' })
  @IsString()
  @IsOptional()
  zipCode?: string;
}
