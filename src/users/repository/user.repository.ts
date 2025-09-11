import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import type { IUserRepository } from './user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    const existentByUserEmail = await this.userRepository.findOne({
      where: { email: createUserDTO.email },
    });

    if (existentByUserEmail) {
      throw new Error('User with this e-mail already exists');
    }

    const existentUserByCpf = await this.userRepository.findOne({
      where: { cpf: createUserDTO.cpf },
    });

    if (existentUserByCpf) {
      throw new Error('User with this CPF already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDTO.passowrd, salt);

    const userData = {
      id: uuidv4(),
      fullName: createUserDTO.fullName,
      username: createUserDTO.username,
      email: createUserDTO.email,
      phone: createUserDTO.phone,
      password: hashedPassword,
      cpf: createUserDTO.cpf,
      adress: createUserDTO.adress || '',
      role: createUserDTO.role,
      isActive: createUserDTO.isActive,
    };

    const user = this.userRepository.create(userData);
    const saveUser = await this.userRepository.save(user);

    return this.mapEntityToDTO(saveUser);
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

  private mapEntityToDTO(userEntity: UserEntity): UserDTO {
    return {
      id: userEntity.id,
      fullName: userEntity.fullName,
      username: userEntity.username,
      email: userEntity.email,
      phone: userEntity.phone,
      cpf: userEntity.cpf,
      adress: userEntity.adress,
      role: userEntity.role,
      isActive: userEntity.isActive,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}
