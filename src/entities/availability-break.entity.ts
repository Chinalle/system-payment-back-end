import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Availability } from './availability.entity';

@Entity('availability_break')
export class AvailabilityBreak {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Availability, (availability) => availability.breaks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'availability_id' })
  availability: Availability;

  @Column({ length: 100, nullable: true })
  name: string;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;
}