import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
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
}
