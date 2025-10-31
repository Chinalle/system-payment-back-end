import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity'; 

@Entity('availability_override') 
export class AvailabilityOverride {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'date', name: 'override_date' }) 
  overrideDate: string; // Formato YYYY-MM-DD

  @Column({ type: 'time', name: 'start_time', nullable: true }) 
  startTime: string | null;

  @Column({ type: 'time', name: 'end_time', nullable: true }) 
  endTime: string | null;

  @Column({ name: 'is_available', default: false }) 
  isAvailable: boolean;

  @Column({ type: 'text', nullable: true }) 
  description: string | null; 
}