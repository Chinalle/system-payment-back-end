import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from './repository/user.repository.interface';
import { UserEntity } from 'src/entities/user.entity';
import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async create(user: CreateUserDTO): Promise<UserDTO> {
    return await this.userRepository.create(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }
}
