import { Injectable } from '@nestjs/common';
import type { IUserRepository } from './user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { User } from 'src/entities/user.entity';
import type { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import type { UpdateUserDto } from 'src/dtos/users/update-user.dto';
import type { UpdateResult } from 'typeorm/browser';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async forgotPassword(
    userId: string,
    hashedPassword: string,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(
      { id: userId },
      {
        passwordHash: hashedPassword,
      },
    );
  }

  async emailConfirm(email: string): Promise<void> {
    await this.userRepository.update(
      { email },
      {
        isConfirmed: true,
      },
    );
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['addresses'],
    });
    return users;
  }

  async findAllActiveUsers(): Promise<User[]> {
    const users = await this.userRepository.find({
      where: {
        isActive: true,
      },
      relations: ['addresses'],
    });
    return users;
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['addresses'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByResetToken(token: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        resetPasswordToken: token,
      },
    });
  }

  async create(user: CreateUserDTO, manager?: EntityManager): Promise<User> {
    const repo = manager ? manager.getRepository(User) : this.userRepository;
    return repo.save(user);
  }

  async update(user: UpdateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.update(
      { id },
      {
        isActive: false,
      },
    );
  }

  async hardDelete(id: string): Promise<void> {
    await this.userRepository.delete(id);
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
