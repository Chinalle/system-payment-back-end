import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { LoginResponseDto } from 'src/dtos/auth/login.response.dto';
import { AuthPayloadDto } from 'src/dtos/auth/payload-jwt.dto';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from 'src/dtos/auth/reset-password.dto';
import { RequestWithRefreshUser } from 'src/dtos/auth/user-tokens.response.dto';
import { UserDTO } from 'src/dtos/users/user.dto';

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

  @ApiParam({
    name: 'user jwt payload',
    type: AuthPayloadDto,
  })
  @ApiResponse({
    type: UserDTO,
  })
  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async me(@Request() req: RequestWithRefreshUser) {
    console.table([req.user]);
    return await this.authService.me(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Query('user') userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refreshTokens(@Request() req: RequestWithRefreshUser) {
    console.log('Request', req.user);
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    if (!userId) {
      throw new Error('Must have an userId');
    }
    if (!refreshToken) {
      throw new Error('Must have a refresh token');
    }
    const tokens = await this.authService.refreshTokens(userId, refreshToken);

    return tokens;
  }

  /**
   * "Esqueceu a senha?" PQP
   * RF: Lógica de autorização: um usuário só pode alterar a própria senha,
   * a menos que seja um admin.
   * 1. Enviar e-mail com token para alteração de senha
   * 2. altera a senha no banco
   * **/

  @ApiBody({ type: ForgotPasswordDto })
  @ApiNoContentResponse({
    example: {
      message:
        'Se um usuário com este e-mail existir, um link de redefinição será enviado.',
    },
  })
  @Patch('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiBody({ type: ResetPasswordDto })
  @ApiNoContentResponse()
  @Patch('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);
  }
}
