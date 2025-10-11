import type { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { UserDTO } from 'src/dtos/users/user.dto';
import type { User } from 'src/entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  softDelete(id: string): Promise<void>;
  hardDelete(id: string): Promise<void>;
  setCurrentRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void>;
}
