import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CompanyModule } from 'src/companies/company.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { UserModule } from 'src/users/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { constants } from './constants';
import { RolesGuard } from './guards/roles.guard';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

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
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RolesGuard,
    JwtRefreshStrategy,
    RolesGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
