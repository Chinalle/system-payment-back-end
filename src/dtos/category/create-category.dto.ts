import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    required: true,
    example: 'software develpment',
    description: 'category name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    example: true,
    description: 'Status to use soft delete',
    default: true,
  })
  @IsBoolean({ message: 'Needs to be an boolean value' })
  isActive: boolean;
}
