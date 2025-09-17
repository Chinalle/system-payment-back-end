import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { constants } from './constants';

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

    validate(req: Request, payload: any) {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            throw new UnauthorizedException('Refresh token not found in header');
        }
        const refreshToken = authHeader.replace('Bearer', '').trim();
        return { ...payload, refreshToken };
    }
}