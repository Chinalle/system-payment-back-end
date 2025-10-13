import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { Service } from './services.entity';
import { CompanyMember } from './company-member.entity';

@Entity('company')
export class Company {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 45 })
  name: string;

  @Column({ type: 'varchar', unique: true })
  cnpj: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'logo_img', type: 'text', nullable: true })
  logoImg?: string;

  @Column({ name: 'business_hours', type: 'jsonb', nullable: true })
  businessHours?: Record<string, any>;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 5,
    nullable: true,
  })
  rating: number;

  @Column({ name: 'stripe_account_id', type: 'text' })
  stripeAccountId: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Address, (address) => address.company)
  addresses?: Address[];

  @OneToMany(() => Service, (service) => service.company)
  services: Service[];

  @OneToMany(() => CompanyMember, (companyMember) => companyMember.company)
  companyMembers: CompanyMember[];
}
