// src/entities/dados-bancarios.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity('bank_details')
export class BankDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 45 })
    account: string;

    @Column({ type: 'varchar', length: 45 })
    agency: string;

    @Column({ type: 'varchar', length: 45 })
    bank: string;

    @Column({ type: 'varchar', length: 255 })
    key_pix: string;

    @ManyToOne(() => Company, { nullable: true })
    @JoinColumn({ name: 'empresa_id' })
    company: Company;
}