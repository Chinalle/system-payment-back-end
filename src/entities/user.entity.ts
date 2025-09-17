import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 500, name: 'full_name' })
  fullName: string;

  @Column({ length: 120, type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: false })
  phone: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', unique: true })
  cpf: string;

  @Column({ type: 'text' })
  adress: string;

  @Column({ type: 'text' })
  role: string;

  @Column({ type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'current_hashed_refresh_token', type: 'varchar', length: 255, nullable: true })
  currentHashedRefreshToken?: string | null;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
