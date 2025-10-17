import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Services } from './services.entity';

@Entity('services_pricing')
export class ServicePricing {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'service_id', type: 'uuid' })
  serviceId: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  priceInCents: number;

  @Column({ type: 'int' })
  durationInMinutes: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // Table relations

  @ManyToOne(() => Services, (service) => service.servicePricing, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'service_id' })
  services: Services;
}
