import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { constants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, rememberMe = false) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const expiresIn = rememberMe ? '7d' : '60m';
    return {
      access_token: this.jwtService.sign(payload, { expiresIn }),
    };
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