import { Inject, Injectable } from '@nestjs/common';
import type { AddressRepository } from './repository/address.repository';
import type { Address } from 'src/entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('IAddressRepository')
    private readonly addressRepository: AddressRepository,
  ) {}

  async create(address: Address): Promise<Address> {
    return this.addressRepository.create(address);
  }
}
