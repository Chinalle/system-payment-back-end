import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { constants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from 'src/entities/login.entity';
import { LoginRepository } from '../login/repository/login.repository';
import { LoginModule } from 'src/login/login.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    // UserModule,
    PassportModule,
    JwtModule.register({
      secret: constants.jwtSecret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
