// src/entities/pagamento.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { StatusPagamento, MetodoPagamento } from './enum';
import { Timestamp } from 'typeorm/browser';

@Entity('pagamento')
export class Pagamento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'double precision' })
    valor: number;

    @Column({
        type: 'enum',
        enum: StatusPagamento,
        default: StatusPagamento.PENDENTE,
    })
    status: StatusPagamento;

    @Column({
        type: 'enum',
        enum: MetodoPagamento,
    })
    metodo_pagamento: MetodoPagamento;

    @Column({ type: 'integer', nullable: true })
    parcelas: number;

    @CreateDateColumn({ nullable: true })
    processado_em: Timestamp;
}