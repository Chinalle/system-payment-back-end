import { Injectable } from '@nestjs/common';
import type { IUserRepository } from './user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from 'src/entities/user.entity';
import type { CreateUserDTO } from 'src/dtos/users/create-user.dto';

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

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(user: CreateUserDTO, manager?: EntityManager): Promise<User> {
    const repo = manager ? manager.getRepository(User) : this.userRepository;
    return repo.save(user);
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
