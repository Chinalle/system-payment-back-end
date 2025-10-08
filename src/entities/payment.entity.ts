import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';
import { StatusPayment, PaymentMethod } from './enum';

@Entity('payment')
export class Payment {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'price_in_cents', type: 'int' })
  priceInCents: number;

  @Column({
    type: 'enum',
    enum: StatusPayment,
    default: StatusPayment.PENDING,
  })
  status: StatusPayment;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  payment_method: PaymentMethod;

  @Column({ type: 'integer', nullable: true })
  installments: number;

  @CreateDateColumn({ name: 'processed_in', type: 'timestamp', nullable: true })
  processedIn: Timestamp;
}
