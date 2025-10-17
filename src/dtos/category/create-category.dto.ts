import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    required: true,
    example: 'software develpment',
    description: 'category name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
