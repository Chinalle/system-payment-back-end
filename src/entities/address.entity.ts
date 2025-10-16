import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Company } from './company.entity';

@Entity('addresses')
export class Address {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'street', type: 'varchar', length: 255 })
  street: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  complement?: string;

  @Column({ name: 'number', type: 'varchar', length: 45 })
  number: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ name: 'zip_code', type: 'varchar', length: 255 })
  zipCode: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // Tables Relations

  @ManyToOne(() => User, (user) => user.addresses, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId?: string;

  @ManyToOne(() => Company, (company) => company.addresses, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company?: Company;

  @Column({ name: 'company_id', type: 'uuid', nullable: true })
  companyId?: string;
}
