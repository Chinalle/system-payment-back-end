import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { QuotationRequest } from './enum';
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => Services, (service) => service.quotationRequest, {
    nullable: false,
  })
  @JoinColumn({ name: 'services' })
  services: Services;

  @OneToOne(() => User, (user) => user.quotationRequest)
  @JoinColumn({ name: 'client' })
  client: User;
}
