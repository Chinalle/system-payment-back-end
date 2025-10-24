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
import { MailerModule } from 'src/mailer/mailer.module';
import { RolesGuard } from './guards/roles.guard'; 
import { CompanyModule } from 'src/companies/company.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MailerModule,
    PassportModule,
    CompanyModule,
    JwtModule.register({
      secret: constants.jwtSecret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard, JwtRefreshStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
