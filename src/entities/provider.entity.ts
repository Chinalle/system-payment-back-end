import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { RoleProvider } from './enum';
import { Login } from './login.entity';
import { Company } from './company.entity';
import { Contract } from './contract.entity';
import { WorkSchedule } from './work-schedule.entity';
import { ScheduleOverride } from './schedule-override.entity';

@Entity('provider')
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    provider_name: string;

    @Column({
        type: 'enum',
        enum: RoleProvider,
    })
    roleProvider: RoleProvider;

    @OneToOne(() => Login, { cascade: true, eager: true })
    @JoinColumn({ name: 'login_id' })
    login: Login;

    @ManyToOne(() => Company, { nullable: true })
    @JoinColumn({ name: 'empresa_id' })
    company: Company;

    @ManyToMany(() => Contract, contract => contract.provider)
    contracts: Contract[];

    @OneToMany(() => WorkSchedule, (workSchedule) => workSchedule.provider)
    workSchedules: WorkSchedule[];

    @OneToMany(() => ScheduleOverride, (scheduleOverride) => scheduleOverride.provider)
    scheduleOverrides: ScheduleOverride[];

}