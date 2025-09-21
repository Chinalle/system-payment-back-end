import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('empresa')
export class Empresa {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 45 })
    nome: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}