import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from './repository/user.repository.interface';

import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import type { User } from 'src/entities/user.entity';
import { AddressService } from 'src/address/address.service';
import { LoginService } from 'src/login/login.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    private readonly address: AddressService,
    private readonly login: LoginService,
  ) {}

  async create(user: CreateUserDTO): Promise<UserDTO> {
    const newAddress = await this.address.create(user.address);

    const saltRounds = 20;
    const hashedPassword = await bcrypt.hash(user.login.password, saltRounds);

    const newLogin = await this.login.create({
      email: user.login.email,
      hashedPassword: hashedPassword,
    });

    const userData = {
      id: uuidv4(),
      fullname: user.fullName,
      phone: user.phone,
      birthDate: user.birthDate,
      cpfCnpj: user.cpfCnpj,
      isActive: user.isActive,
      role: user.role,
      address: newAddress,
      login: newLogin,
    };

    const savedUser = await this.userRepository.create(userData);

    return this.mapEntityToDTO(savedUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async setCurrentRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void> {
    return this.userRepository.setCurrentRefreshToken(id, refreshToken);
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  private mapEntityToDTO(user: User): UserDTO {
    return {
      id: user.id,
      fullName: user.fullname,
      login: user.login,
      birthDate: user.birthDate,
      phone: user.phone,
      cpfCnpj: user.cpfCnpj,
      address: user.address,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
