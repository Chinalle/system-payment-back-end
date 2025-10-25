import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { CompanyMember } from './company-member.entity';
import { Role } from './enum';
import { QuotationRequestEntity } from './quotation-request.entity';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullName: string;

  @Column({ name: 'email', type: 'varchar', length: 60, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 45 })
  phone: string;

  @Column({ name: 'cpf', type: 'varchar', length: 45, unique: true })
  cpf: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @Column({
    name: 'current_hashed_refresh_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  currentHashedRefreshToken?: string | null;

  @Column({ name: 'reset_password_token', type: 'varchar', nullable: true })
  resetPasswordToken: string | null;

  @Column({
    name: 'reset_password_expires',
    type: 'timestamp with time zone',
    nullable: true,
  })
  resetPasswordExpires: Date | null;

  @Column({ name: 'is_confirmed', type: 'boolean', default: false })
  isConfirmed: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => CompanyMember, (companyMember) => companyMember.user, {
    cascade: true,
  })
  companyMember: CompanyMember;

  @OneToMany(() => Address, (address) => address.user, { cascade: true })
  addresses?: Address[];

  @OneToMany(
    () => QuotationRequestEntity,
    (quotationRequest) => quotationRequest.services,
    { nullable: true },
  )
  @JoinColumn({ name: 'quotation_request' })
  quotationRequest: QuotationRequestEntity[];
}
