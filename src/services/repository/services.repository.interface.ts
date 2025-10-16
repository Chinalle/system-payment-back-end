import type { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { User } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';

export interface IServicesRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: CreateUserDTO, manager?: EntityManager): Promise<User>;
}
