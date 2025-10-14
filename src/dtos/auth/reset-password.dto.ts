import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'token to validate user',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'New user password',
    example: 'NewStrongP@ssw0rd!',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'user email',
    example: 'johndoe@gmail.com',
  })
  @IsEmail(
    {},
    {
      message: 'Must send a valid email',
    },
  )
  @IsNotEmpty()
  email: string;
}
