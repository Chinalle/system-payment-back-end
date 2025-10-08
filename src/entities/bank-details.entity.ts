// src/entities/dados-bancarios.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity('bank_details')
export class BankDetails {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 45 })
  account: string;

  @Column({ type: 'varchar', length: 45 })
  agency: string;

  @Column({ type: 'varchar', length: 45 })
  bank: string;

  @Column({ name: 'key_pix', type: 'varchar', length: 255 })
  keyPix: string;

  @ManyToOne(() => Company, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
