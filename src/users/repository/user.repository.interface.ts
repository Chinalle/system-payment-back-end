import { UserDTO } from 'src/dtos/users/user.dto';
import { UserEntity } from '../../entities/user.entity';

export interface IUserRepository {
  findAll(): Promise<UserEntity[]>;
  findOne(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(user: Partial<UserEntity>): Promise<UserDTO>;
  softDelete(id: string): Promise<void>;
  hardDelete(id: string): Promise<void>;
}
