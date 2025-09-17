import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({}),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy,],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
