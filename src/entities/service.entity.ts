import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ServiceImage } from './service-image.entity';
import { ServicePaymentOption } from './service-payment-option.entity';
import { ServiceCategory } from './service-category.entity';

@Entity('service')
export class Service {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'service_name', length: 45 })
  serviceName: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'estimated_duration_minutes', type: 'int', nullable: true })
  estimatedDurationMinutes: number;

  @Column({ name: 'price_in_cents', type: 'int' })
  priceInCents: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ServiceCategory, (category) => category.services, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: ServiceCategory;

  @OneToMany(() => ServiceImage, (image) => image.service)
  images: ServiceImage[];

  @OneToMany(
    () => ServicePaymentOption,
    (paymentOption) => paymentOption.service,
  )
  paymentOptions: ServicePaymentOption[];
}
