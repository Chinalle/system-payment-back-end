import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshGuard } from './jwt-refresh.guard';
import { Throttle } from '@nestjs/throttler';
import { LoginDto } from '../dtos/auth/login.dto';
import { LoginResponseDto } from 'src/dtos/auth/login.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'User authenticated successfully.',
  })
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    rememberMe: boolean,
  ): Promise<LoginResponseDto> {
    console.log('rota chamada - usuario: ', loginDto);
    return await this.authService.login(loginDto, rememberMe);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req: any) {
    return this.authService.logout(req.user.sub);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refreshTokens(@Request() req: any) {
    console.log('Request', req);
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
