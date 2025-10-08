import type { Address } from 'src/entities/address.entity';

export interface IAddressRepository {
  create(address: Address): Promise<Address>;
}
