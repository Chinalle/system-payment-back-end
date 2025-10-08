import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './enum';
import { Login } from './login.entity';
import { Address } from './address.entity';
import { Company } from './company.entity';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'full_name', type: 'varchar', length: 255 })
  fullname: string;

  @Column({ type: 'varchar', length: 45 })
  phone: string;

  @Column({ name: 'cpf_cnpj', type: 'varchar', length: 45, unique: true })
  cpfCnpj: string;

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({
    name: 'user_role_enum',
    type: 'enum',
    enum: Role,
  })
  userRoleEnum: Role;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @Column({
    name: 'current_hashed_refresh_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  currentHashedRefreshToken?: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Login, { nullable: true })
  @JoinColumn({ name: 'login_id' })
  login: Login;

  @OneToOne(() => Address, { nullable: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => Company, (company) => company.user)
  company: Company;
}
