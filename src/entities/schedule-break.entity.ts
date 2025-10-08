import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { WorkSchedule } from './work-schedule.entity';

@Entity('schedule_breaks')
export class ScheduleBreak {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @ManyToOne(() => WorkSchedule, (workSchedule) => workSchedule.scheduleBreaks)
  @JoinColumn({ name: 'work_schedule_id' })
  workSchedule: WorkSchedule;
}
