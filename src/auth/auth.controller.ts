import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dtos/auth/login.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(ThrottlerGuard, LocalAuthGuard)

    @ApiOkResponse({
        description: 'User authenticated successfully.',
    })

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: any, @Body() loginDto: LoginDto) {
        return this.authService.login(req.user);
    }
}