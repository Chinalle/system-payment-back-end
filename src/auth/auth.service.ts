import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { constants } from './constants';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AuthPayloadDto } from 'src/dtos/auth/payload-jwt.dto';
import { LoginResponseDto } from 'src/dtos/auth/login.response.dto';

type AuthValidatedUserResponse = Omit<
  UserEntity,
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
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      const result: AuthValidatedUserResponse = user;
      return result;
    }
    return null;
  }

  async login(login: LoginDto, rememberMe: boolean): Promise<LoginResponseDto> {
    const existentUser = await this.userService.findByEmail(login.email);
    console.log('AuthService: ' + existentUser);
    if (!existentUser) {
      throw new Error('User Not Found');
    }

    const payload: AuthPayloadDto = {
      sub: existentUser.id,
      email: existentUser.email,
      role: existentUser.role,
    };
    const expiresIn = rememberMe ? '7d' : '60m';
    const token = this.jwtService.sign(payload, { expiresIn });
    const response: LoginResponseDto = {
      token: token,
    };

    return response;
  }

  async logout(userId: string) {
    return this.userService.setCurrentRefreshToken(userId, null);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.currentHashedRefreshToken) {
      throw new UnauthorizedException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );

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

  private async getTokens(userId: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        { secret: constants.jwtSecret, expiresIn: '15m' },
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
