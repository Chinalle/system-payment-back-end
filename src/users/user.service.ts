import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IUserRepository } from './repository/user.repository.interface';

import { UserDTO } from 'src/dtos/users/user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import type { User } from 'src/entities/user.entity';
import { AddressService } from 'src/address/address.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { DataSource } from 'typeorm';
import type { UpdateUserDto } from 'src/dtos/users/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    private readonly addressService: AddressService,

    private readonly dataSource: DataSource,
  ) {}

  /**
   * @param CreateUserDTO
   * Utilizado o manager que cria uma transaction, ou seja, o usuário o será criado se toda
   * operação for bem sucedida
   * **/
  async create(user: CreateUserDTO): Promise<UserDTO> {
    return await this.dataSource.transaction(async (manager) => {
      const hashedPassword = await this.generateHashedPassword(
        user.passwordHash,
      );

      const userData = {
        id: uuidv4(),
        fullName: user.fullName,
        email: user.email,
        passwordHash: hashedPassword,
        phone: user.phone,
        birthDate: user.birthDate,
        cpf: user.cpf,
        isActive: user.isActive,
        isConfirmed: false,
        role: user.role,
      };

      const savedUser = await this.userRepository.create(userData, manager);

      if (user.addresses && user.addresses.length > 0) {
        const createdAddresses = await Promise.all(
          user.addresses.map((addressDto) =>
            this.addressService.create(
              { ...addressDto },
              savedUser,
              savedUser.id,
              manager,
            ),
          ),
        );
        savedUser.addresses = createdAddresses;
      }

      return this.mapEntityToDTO(savedUser);
    });
  }

  async forgotPassword(userId: string, password: string) {
    const existentUser = await this.userRepository.findById(userId);

    if (!existentUser) {
      throw new Error('User Not Found');
    }

    const hashedPassword = await this.generateHashedPassword(password);

    const result = await this.userRepository.forgotPassword(
      userId,
      hashedPassword,
    );

    if (result.affected === 0) {
      throw new Error('User Not Found');
    }
  }

  // TODO: necessário implementar update para validação de tabelas relacionadas
  // FIXME: Alterar de save para update, e comparar campo a campo para evitar erros de sobrescrição de campos desnecessários
  async update(id: string, user: UpdateUserDto): Promise<User> {
    console.log(`requesting update to user with id: ${id}`, user);

    const userToUpdate = await this.userRepository.findById(id);

    console.log(`old user data`, userToUpdate);

    if (!userToUpdate) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }

    const { addresses: addressesDto, password, ...userData } = user;

    console.log('addresses: ', addressesDto);

    Object.assign(userToUpdate, userData);

    if (password) {
      const hashedPassword = await this.generateHashedPassword(password);
      userToUpdate.passwordHash = hashedPassword;
    }

    if (addressesDto && addressesDto.length > 0) {
      userToUpdate.addresses = userToUpdate.addresses || [];

      for (const addressDto of addressesDto) {
        const existingAddress = userToUpdate.addresses.find(
          (addr) => addr.id == addressDto.id,
        );

        if (existingAddress) {
          Object.assign(existingAddress, addressDto);
        } else {
          console.warn(
            `Address with ID "${addressDto.id}" not found on user. Skipping update.`,
          );
        }
      }
    }

    return await this.userRepository.update(userToUpdate);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findAllActiveUsers(): Promise<User[]> {
    return await this.userRepository.findAllActiveUsers();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findByResetToken(token: string): Promise<User | null> {
    return this.userRepository.findByResetToken(token);
  }

  async setCurrentRefreshToken(
    id: string,
    refreshToken: string | null,
  ): Promise<void> {
    return this.userRepository.setCurrentRefreshToken(id, refreshToken);
  }

  async findById(id: string): Promise<User | null> {
    console.log(
      'findOne UserService: ',
      await this.userRepository.findById(id),
    );
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Not Found');
    }
    return user;
  }

  async me(id: string): Promise<UserDTO | null> {
    console.log('me UserService: ', await this.userRepository.findById(id));
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Not Found');
    }
    const userDtoResponse = this.mapEntityToDTO(user);

    return userDtoResponse;
  }

  async emailConfirm(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User Not Found');
    }

    await this.userRepository.emailConfirm(email);
  }

  private mapEntityToDTO(user: User): UserDTO {
    const addressesDTO = user.addresses?.map((address) => ({
      id: address.id,
      street: address.street,
      number: address.number,
      complement: address.complement,
      district: address.district,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
    }));

    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      birthDate: user.birthDate,
      phone: user.phone,
      cpf: user.cpf,
      addresses: addressesDTO ?? [],
      role: user.role,
      resetPasswordToken: user.resetPasswordToken ?? null,
      resetPasswordExpires: user.resetPasswordExpires ?? null,
      isActive: user.isActive,
      isConfirmed: user.isConfirmed,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async softDelete(id: string): Promise<void> {
    const existentUser = await this.userRepository.findById(id);

    if (!existentUser) {
      throw new Error('User Not Found');
    }

    await this.userRepository.softDelete(id);
  }

  async hardDelete(id: string): Promise<void> {
    if (!id) {
      throw new Error('must have user id');
    }
    const existentUser = await this.userRepository.findById(id);

    if (!existentUser) {
      throw new Error('User Not Found');
    }

    await this.userRepository.hardDelete(id);
  }

  private async generateHashedPassword(pasword: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pasword, saltRounds);

    return hashedPassword;
  }
}
