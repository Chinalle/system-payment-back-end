import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'node:crypto';
import { LoginDto } from 'src/dtos/auth/login.dto';
import { LoginResponseDto } from 'src/dtos/auth/login.response.dto';
import type {
  ForgotPasswordDto,
  ResetPasswordDto,
} from 'src/dtos/auth/reset-password.dto';
import { UserDTO } from 'src/dtos/users/user.dto';
import type { User } from 'src/entities/user.entity';
import { MailService } from 'src/mailer/mailer.service';
import { UserService } from '../users/user.service';
import { constants } from './constants';

type AuthValidatedUserResponse = Omit<
  User,
  'password' | 'createdAt' | 'updatedAt'
>;

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailSender: MailService,
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

  async me(userId: string): Promise<UserDTO> {
    const user = await this.userService.me(userId);

    if (!user) {
      throw new NotFoundException('Not Found');
    }

    return user;
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

  async forgotPassword(forgotPassword: ForgotPasswordDto) {
    const user = await this.userService.findByEmail(forgotPassword.email);

    if (user) {
      const { resetToken, hashedResetToken } = await this.generateResetToken();

      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 24);

      await this.userService.update(user.id, {
        resetPasswordToken: hashedResetToken,
        resetPasswordExpires: expirationDate,
      });

      const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
      console.log('resetLink', resetLink);

      await this.mailSender.sendPasswordResetToken(
        forgotPassword.email,
        user.fullName.split(' ')[0],
        resetLink,
      );
    }

    return {
      message:
        'Se um usuário com este e-mail existir, um link de redefinição será enviado.',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, password } = resetPasswordDto;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await this.userService.findByResetToken(hashedToken);

    if (!user || user.resetPasswordToken === null) {
      throw new Error('');
    }
    if (new Date() > user.resetPasswordExpires!) {
      throw new BadRequestException('Token inválido ou expirado.');
    }

    const hashedPassword = await this.generateHashedPassword(password);
    await this.userService.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });
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

  private generateResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    const hashedResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    return {
      resetToken,
      hashedResetToken,
    };
  }

  private async generateHashedPassword(pasword: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pasword, saltRounds);

    return hashedPassword;
  }
}
