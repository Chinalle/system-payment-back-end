import { Inject, Injectable } from '@nestjs/common';
import type { ILoginRepository } from './repository/login.repository.interface';
import type { Login } from 'src/entities/login.entity';
import type { CreateLoginDTO } from 'src/dtos/login/create-login.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoginService {
  constructor(
    @Inject('ILoginRepository')
    private readonly loginRepository: ILoginRepository,
  ) {}

  async create(login: CreateLoginDTO): Promise<Login> {
    const newLogin: Login = {
      id: uuidv4(),
      email: login.email,
      password: login.hashedPassword,
    };

    return await this.loginRepository.create(newLogin);
  }
}
