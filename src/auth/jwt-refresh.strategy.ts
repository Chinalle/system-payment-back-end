import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { constants } from './constants';
import { AuthPayloadDto } from 'src/dtos/auth/payload-jwt.dto';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: constants.jwtRefreshSecret,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AuthPayloadDto) {
    const authHeader = req.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Refresh token not found in header');
    }
    const refreshToken = authHeader.substring(7);
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found in header');
    }

    const refreshTokenResponse: AuthPayloadDto = {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      refreshToken: refreshToken,
    };

    return refreshTokenResponse;
  }
}
