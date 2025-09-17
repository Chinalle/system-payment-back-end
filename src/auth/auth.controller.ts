import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/auth/login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginResponseDto } from 'src/dtos/auth/login.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'User authenticated successfully.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    const token = this.authService.login(loginDto);

    return { token: token };
  }
}
