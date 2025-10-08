import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from 'src/entities/login.entity';
import { ILoginRepository } from './login.repository.interface';

@Injectable()
export class LoginRepository implements ILoginRepository {
  constructor(
    @InjectRepository(Login)
    private readonly typeormRepository: Repository<Login>,
  ) {}

  async create(loginEntity: Login): Promise<Login> {
    return this.typeormRepository.save(loginEntity);
  }

  async findByEmail(email: string): Promise<Login | null> {
    return this.typeormRepository.findOneBy({ email });
  }
}
