import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Provider } from './provider.entity';
import { ScheduleBreak } from './schedule-break.entity';

@Entity('work_schedules')
export class WorkSchedule {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'integer', name: 'day_of_week' })
  dayOfWeek: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @ManyToOne(() => Provider, (provider) => provider.workSchedules)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @OneToMany(() => ScheduleBreak, (scheduleBreak) => scheduleBreak.workSchedule)
  scheduleBreaks: ScheduleBreak[];
}
