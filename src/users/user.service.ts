import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from './repository/user.repository.interface';

import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import type { User } from 'src/entities/user.entity';
import { AddressService } from 'src/address/address.service';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    private readonly address: AddressService,
    private readonly login: LoginService,
  ) {}

  async create(user: CreateUserDTO): Promise<UserDTO> {
    return await this.userRepository.create(user);
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

  private mapEntityToDTO(userEntity: User): UserDTO {
    return {
      id: userEntity.id,
      fullName: userEntity.fullname,
      email: userEntity.login.email,
      phone: userEntity.phone,
      cpfCnpj: userEntity.cpfCnpj,
      address: userEntity.address,
      role: userEntity.userRoleEnum,
      isActive: userEntity.isActive,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}
