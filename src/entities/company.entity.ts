import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 45 })
    company_name: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}