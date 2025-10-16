import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Company } from './company.entity';
import { User } from './user.entity';
import { RoleProvider } from './enum';

@Entity('company_member')
export class CompanyMember {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'provider_role', type: 'enum', enum: RoleProvider })
  providerRole: RoleProvider;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // Tables Relations

  @ManyToOne(() => Company, (company) => company.companyMembers, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToOne(() => User, (user) => user.companyMember)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
