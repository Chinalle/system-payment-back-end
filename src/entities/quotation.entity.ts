import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Quotation } from './enum';
import { QuotationRequestEntity } from './quotation-request.entity';
import { User } from './user.entity';

@Entity('quotation')
export class QuotationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'request_id', type: 'uuid' })
  requestId: string;

  @Column({ name: 'provider_id', type: 'uuid' })
  providerId: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'proposed_price_in_cents', type: 'int' })
  proposedPriceInCents: number;

  @Column({ name: 'estimated_duration_minutes', type: 'int' })
  estimatedDurationMinutes: number;

  @Column({ name: 'status', type: 'enum', enum: Quotation })
  status: Quotation;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'expired_at', type: 'timestamptz' })
  expiredAt: Date;

  @OneToOne(() => QuotationRequestEntity, (request) => request.quotation)
  @JoinColumn({ name: 'request_id' })
  quotationRequest: QuotationRequestEntity;

  @ManyToOne(() => User, (provider) => provider.quotations)
  @JoinColumn({ name: 'provider_id' })
  provider: User;
}
