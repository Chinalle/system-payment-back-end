import { Injectable } from '@nestjs/common';
import type { IUserRepository } from './user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type DataSource } from 'typeorm';
import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/entities/user.entity';
import { Address } from 'src/entities/address.entity';
import { Login } from 'src/entities/login.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        login: {
          email: email,
        },
      },
      relations: {
        login: true,
      },
    });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  async softDelete(id: string): Promise<void> {
    const existentUser = await this.userRepository.findOne({ where: { id } });

    if (!existentUser) {
      throw new Error('User Not Found');
    }

    await this.userRepository.update(id, { isActive: false });
  }

  async hardDelete(id: string): Promise<void> {
    if (!id) return;

    const existentUser = await this.userRepository.findOne({ where: { id } });

    if (!existentUser) {
      throw new Error('Not Found');
    }

    await this.userRepository.delete(existentUser.id);
  }

  async setCurrentRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void> {
    await this.userRepository.update(id, {
      currentHashedRefreshToken: refreshToken,
    });
  }

  private isValidPassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
  };
}
