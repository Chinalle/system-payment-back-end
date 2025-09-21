// src/entities/servicos-produtos.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { ServiceCategory } from './service-category.entity';
import { Payment } from './payment.entity';

@Entity('services_products')
export class ServiceProduct {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 45 })
    service_name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'integer', nullable: true })
    execution_time_minuted: number;

    @Column({ type: 'double precision' })
    price: number;

    @OneToOne(() => ServiceCategory)
    @JoinColumn({ name: 'categoria_id' })
    serviceCategory: ServiceCategory;

    @ManyToMany(() => Payment, payment => payment)
    payment: Payment[];
}