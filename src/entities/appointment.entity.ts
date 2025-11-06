import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServicePricing } from './service-pricing.entity';
//import { Quotation } from './quotation.entity'; quando implementar quotation
import { User } from './user.entity';

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

@Entity('appointment')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ServicePricing, { nullable: true })
  @JoinColumn({ name: 'services_pricing_id' })
  servicePricing: ServicePricing | null;

  //@ManyToOne(() => Quotation, { nullable: true })
  //@JoinColumn({ name: 'quotation_id' })
  //quotation: Quotation | null;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.SCHEDULED,
  })
  status: AppointmentStatus;

  @Column({ type: 'timestamp with time zone', name: 'start_time' })
  startTime: Date;

  @Column({ type: 'timestamp with time zone', name: 'end_time' })
  endTime: Date;

  @Column({ type: 'text', name: 'client_notes', nullable: true })
  clientNotes: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}