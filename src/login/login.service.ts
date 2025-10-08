import { Inject, Injectable } from '@nestjs/common';
import type { ILoginRepository } from './repository/login.repository.interface';
import type { Login } from 'src/entities/login.entity';

@Injectable()
export class LoginService {
  constructor(
    @Inject('ILoginRepository')
    private readonly loginRepository: ILoginRepository,
  ) {}

  async create(login: Login): Promise<Login> {
    return await this.loginRepository.create(login);
  }
}
