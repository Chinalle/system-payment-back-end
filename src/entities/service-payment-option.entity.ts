import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_payment_option')
export class ServicePaymentOption {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'price_in_cents', type: 'int' })
  priceInCents: number;

  @Column({ length: 100 })
  condition: string;

  @ManyToOne(() => Service, (service) => service.paymentOptions)
  @JoinColumn({ name: 'serviceId' })
  service: Service;
}
