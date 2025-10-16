import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, type EntityManager } from 'typeorm';
import type { IServicesRepository } from './services.repository.interface';
import type { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import type { User } from 'src/entities/user.entity';
import { Service } from 'src/entities/services.entity';

@Injectable()
export class ServiceRepository implements IServicesRepository {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
  create(user: CreateUserDTO, manager?: EntityManager): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
