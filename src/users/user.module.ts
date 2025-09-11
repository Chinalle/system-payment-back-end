import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { MailerModule } from 'src/mailer/mailer.module';
import { MailService } from 'src/mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule, MailerModule],
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
