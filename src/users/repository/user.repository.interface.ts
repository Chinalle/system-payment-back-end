import type { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import type { UpdateUserDto } from 'src/dtos/users/update-user.dto';
import { User } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';
import type { UpdateResult } from 'typeorm/browser';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDTO, manager?: EntityManager): Promise<User>;
  update(userId: string, user: UpdateUserDto): Promise<User>;
  forgotPassword(userId: string, hashedPassword: string): Promise<UpdateResult>;
  emailConfirm(email: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  hardDelete(id: string): Promise<void>;
  setCurrentRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void>;
}
