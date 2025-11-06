import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  CreateDateColumn
} from 'typeorm';
import { QuotationRequest } from './enum';
import { QuotationEntity } from './quotation.entity';
import { Services } from './services.entity';
import { User } from './user.entity';

@Entity('quotation_request')
export class QuotationRequestEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'service_id', type: 'uuid' })
  serviceId: string;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'client_notes', type: 'text' })
  clientNotes: string;

  @Column({ name: 'status', type: 'enum', enum: QuotationRequest })
  status: QuotationRequest;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Services)
  @JoinColumn({ name: 'service_id' })
  service: Services;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'client_id' })
  client: User;

  @OneToOne(() => QuotationEntity, (quotation) => quotation.quotationRequest)
  quotation: QuotationEntity;
}
