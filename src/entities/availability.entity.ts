import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity'; 
import { AvailabilityBreak } from './availability-break.entity';

@Entity('availability') 
export class Availability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' }) 
  user: User;

  @Column({ type: 'integer', name: 'day_of_week' }) 
  dayOfWeek: number; // 0=Domingo, ..., 6=Sábado

  @Column({ type: 'time', name: 'start_time', nullable: true })
  startTime: string | null;

  @Column({ type: 'time', name: 'end_time', nullable: true })
  endTime: string | null;

  @Column({ name: 'is_available', default: false }) 
  isAvailable: boolean;

  @OneToMany(() => AvailabilityBreak, (breakItem) => breakItem.availability, {
    cascade: true, 
  })
  breaks: AvailabilityBreak[];
}