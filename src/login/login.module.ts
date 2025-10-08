import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from 'src/entities/login.entity';
import { LoginRepository } from './repository/login.repository';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([Login])],
  providers: [
    LoginService,
    {
      provide: 'ILoginRepository',
      useClass: LoginRepository,
    },
  ],
  exports: [LoginService, 'ILoginRepository'],
})
export class LoginModule {}
