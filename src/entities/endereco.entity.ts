// src/entities/endereco.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('endereco')
export class Endereco {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    logradouro: string;

    @Column({ type: 'varchar', length: 255 })
    bairro: string;

    @Column({ type: 'varchar', length: 45 })
    numero: string;

    @Column({ type: 'varchar', length: 255 })
    cidade: string;

    @Column({ type: 'varchar', length: 255 })
    uf: string;
}