import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from './services.entity';

@Entity('category')
export class Category {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45 })
  slug: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Service, (service) => service.category)
  services: Service[];
}
