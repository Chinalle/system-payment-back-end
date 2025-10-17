import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Category } from './category.entity';

@Entity('services')
export class Service {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'requires_quotation', type: 'boolean' })
  requiresQuotation: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // Tables Relations

  @ManyToOne(() => Company, (company) => company.services, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Category, (category) => category.services)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
