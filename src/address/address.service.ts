import { Inject, Injectable } from '@nestjs/common';
import type { CreateAddressDTO } from 'src/dtos/address/create-address.dto';
import type { Address } from 'src/entities/address.entity';
import type { User } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import type { AddressRepository } from './repository/address.repository';

@Injectable()
export class AddressService {
  constructor(
    @Inject('IAddressRepository')
    private readonly addressRepository: AddressRepository,
  ) {}

  async create(
    address: CreateAddressDTO,
    user?: User,
    userId?: string,
    manager?: EntityManager,
  ): Promise<Address> {
    const newAddress: Address = {
      ...address,
      user,
      userId,
      id: uuidv4(),
    } as Address;
    return await this.addressRepository.create(newAddress, manager);
  }
}
