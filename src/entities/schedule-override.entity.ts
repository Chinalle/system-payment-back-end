import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Provider } from './provider.entity';

@Entity('schedule_overrides')
export class ScheduleOverride {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    date: string;

    @Column({ name: 'is_active' })
    isActive: boolean;

    @Column({ type: 'time', name: 'start_time', nullable: true })
    startTime: string | null;

    @Column({ type: 'time', name: 'end_time', nullable: true })
    endTime: string | null;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @ManyToOne(() => Provider, (provider) => provider.scheduleOverrides)
    @JoinColumn({ name: 'provider_id' })
    provider: Provider;
}