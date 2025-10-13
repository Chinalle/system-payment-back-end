import { Injectable } from '@nestjs/common';
import { Address } from 'src/entities/address.entity';
import type { IAddressRepository } from './address.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import type { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(address: Address, manager?: EntityManager): Promise<Address> {
    const repo = manager
      ? manager.getRepository(Address)
      : this.addressRepository;
    return await repo.save(address);
  }
}
