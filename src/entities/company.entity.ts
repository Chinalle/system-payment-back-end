import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { BankDetails } from './bank-details.entity';
import { Provider } from './provider.entity';

@Entity('company')
export class Company {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'company_name', length: 45 })
  companyName: string;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => BankDetails, (bankDetails) => bankDetails.company)
  bankDetails: BankDetails[];

  @OneToMany(() => Provider, (provider) => provider.company)
  providers: Provider[];
}
