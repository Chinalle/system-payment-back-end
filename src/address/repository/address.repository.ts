import { Injectable } from '@nestjs/common';
import { Address } from 'src/entities/address.entity';
import type { IAddressRepository } from './address.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(address: Address): Promise<Address> {
    const newAddress = this.addressRepository.create({
      ...address,
      id: uuidv4(),
    });

    return this.addressRepository.save(newAddress);
  }
}
