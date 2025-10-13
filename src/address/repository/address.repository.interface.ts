import type { Address } from 'src/entities/address.entity';
import { EntityManager } from 'typeorm';

export interface IAddressRepository {
  create(address: Address, manager?: EntityManager): Promise<Address>;
}
