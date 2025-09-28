import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ServiceImage } from './service-image.entity';
import { ServicePaymentOption } from './service-payment-option.entity';

@Entity('service')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 50 })
  category: string;

  @Column({ type: 'int' })
  estimatedDuration: number; // in minutes

  @OneToMany(() => ServiceImage, (image) => image.service, { cascade: true })
  images: ServiceImage[];

  @OneToMany(
    () => ServicePaymentOption,
    (paymentOption) => paymentOption.service,
    { cascade: true },
  )
  paymentOptions: ServicePaymentOption[];
  createdAt: Date;
  updatedAt: Date;
}
