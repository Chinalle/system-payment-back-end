// src/entities/dados-bancarios.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('dados_bancarios')
export class DadosBancarios {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 45 })
    conta: string;

    @Column({ type: 'varchar', length: 45 })
    agencia: string;

    @Column({ type: 'varchar', length: 45 })
    banco: string;

    @Column({ type: 'varchar', length: 255 })
    chave_pix: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}