import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_payment_option')
export class ServicePaymentOption {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 100 })
  condition: string; // e.g. "Cash", "Credit card up to 3x"

  @ManyToOne(() => Service, (service) => service.paymentOptions, {
    onDelete: 'CASCADE',
  })
  service: Service;
}
