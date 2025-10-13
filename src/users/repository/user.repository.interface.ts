import type { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { User } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: CreateUserDTO, manager?: EntityManager): Promise<User>;
  emailConfirm(email: string): Promise<void>;
  softDelete(id: string): Promise<void>;
  hardDelete(id: string): Promise<void>;
  setCurrentRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void>;
}
