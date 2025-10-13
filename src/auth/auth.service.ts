import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { constants } from './constants';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { LoginResponseDto } from 'src/dtos/auth/login.response.dto';
import type { User } from 'src/entities/user.entity';

type AuthValidatedUserResponse = Omit<
  User,
  'password' | 'createdAt' | 'updatedAt'
>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthValidatedUserResponse | null> {
    const user = await this.userService.findByEmail(email);
    console.log('AuthService - loginDto: ', email);
    console.log('AuthService - user: ', password);
    if (
      user &&
      user.passwordHash &&
      (await bcrypt.compare(password, user.passwordHash))
    ) {
      const result: AuthValidatedUserResponse = user;
      return result;
    }
    return null;
  }

  async login(login: LoginDto, rememberMe: boolean): Promise<LoginResponseDto> {
    const existentUser = await this.userService.findByEmail(login.email);
    console.log('AuthService: ', existentUser);
    if (!existentUser) {
      throw new Error('User Not Found');
    }

    const tokens = await this.getTokens(
      existentUser.id,
      existentUser.email,
      existentUser.role,
      rememberMe,
    );

    await this.updateRefreshToken(existentUser.id, tokens.refreshToken);

    const response: LoginResponseDto = {
      token: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };

    return response;
  }

  async logout(userId: string) {
    return this.userService.setCurrentRefreshToken(userId, null);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    console.log('refreshToken authService using findById: ', user);
    if (!user || !user.currentHashedRefreshToken) {
      throw new UnauthorizedException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

    await this.jwtService.verifyAsync(refreshToken, {
      secret: constants.jwtRefreshSecret,
    });

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.setCurrentRefreshToken(userId, hashedRefreshToken);
  }

  private async getTokens(
    userId: string,
    email: string,
    role: string,
    rememberMe?: boolean,
  ) {
    const expiresIn = rememberMe ? '7d' : '60m';
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: constants.jwtSecret, expiresIn: expiresIn },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: constants.jwtRefreshSecret, expiresIn: '7d' },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
