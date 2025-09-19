import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { constants } from './constants';
import { AuthPayloadDto } from 'src/dtos/auth/payload-jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.jwtSecret,
    });
  }

  validate(payload: AuthPayloadDto) {
    return { userId: payload.sub, email: payload.email };
  }
}
