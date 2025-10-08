import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  Timestamp,
} from 'typeorm';
import { StatusContract } from './enum';
import { User } from './user.entity';
import { Company } from './company.entity';
import { Payment } from './payment.entity';
import { Provider } from './provider.entity';
import { Service } from './service.entity';

@Entity('contract')
export class Contract {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'hiring_date', type: 'timestamp' })
  hiringDate: Timestamp;

  @Column({ name: 'total_value_in_cents', type: 'int' })
  totalValue: number;

  @Column({
    type: 'enum',
    enum: StatusContract,
    default: StatusContract.PENDING,
  })
  status: StatusContract;

  @Column({ type: 'date', nullable: true })
  term: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  client: User;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => Payment, { cascade: true, eager: true })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @OneToOne(() => Service, { cascade: true, eager: true })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToMany(() => Provider, (provider) => provider.contracts)
  @JoinTable({
    name: 'provider_has_contracts',
    joinColumn: { name: 'contracts_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'provider_id', referencedColumnName: 'id' },
  })
  provider: Provider[];
}
