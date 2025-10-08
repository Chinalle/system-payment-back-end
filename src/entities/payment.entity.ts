import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Timestamp } from 'typeorm';
import { StatusPayment, PaymentMethod } from './enum';

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'double precision' })
    value: number;

    @Column({
        type: 'enum',
        enum: StatusPayment,
        default: StatusPayment.PENDING,
    })
    status: StatusPayment;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
    })
    payment_method: PaymentMethod;

    @Column({ type: 'integer', nullable: true })
    installments: number;

    @CreateDateColumn({ nullable: true })
    processed_in: Timestamp;
}