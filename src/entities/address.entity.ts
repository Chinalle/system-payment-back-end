import { Entity, PrimaryColumn, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('address')
export class Address {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  public_place: string;

  @Column({ type: 'varchar', length: 255 })
  district: string;

  @Column({ name: 'house_number', type: 'varchar', length: 45 })
  houseNumber: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
