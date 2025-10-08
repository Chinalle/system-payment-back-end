import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entities/address.entity';
import { AddressRepository } from './repository/address.repository';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  providers: [
    AddressService,
    { provide: 'IAddressRepository', useClass: AddressRepository },
  ],
  exports: [AddressService, 'IAddressRepository'],
})
export class AddressModule {}
