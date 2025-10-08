import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailService } from 'src/mailer/mailer.service';

import { AddressModule } from 'src/address/address.module';
import { LoginModule } from 'src/login/login.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    ConfigModule,
    MailerModule,
    AddressModule,
    LoginModule,
  ],
  controllers: [UserController],
  exports: [UserService, 'IUserRepository'],
  providers: [
    UserService,
    MailService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
