import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('service')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 50 })
  category: string;

  @Column({ type: 'int' })
  estimatedDuration: number; // em minutos
}
