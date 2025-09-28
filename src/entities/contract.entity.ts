import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { StatusContract } from './enum';
import { User } from './users.entity';
import { Company } from './company.entity';
import { Payment } from './payment.entity';
import { Provider } from './provider.entity';
import { ServiceProduct } from './services_products.entity';
import { Timestamp } from 'typeorm/browser';

@Entity('contract')
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    hiring_date: Timestamp;

    @Column({ type: 'double precision' })
    total_value: number;

    @Column({
        type: 'enum',
        enum: StatusContract,
        default: StatusContract.PENDING,
    })
    status: StatusContract;

    @Column({ type: 'date', nullable: true })
    term: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    client: User;

    @ManyToOne(() => Company)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @OneToOne(() => Payment, { cascade: true, eager: true })
    @JoinColumn({ name: 'payment_id' })
    payment: Payment;

    @OneToOne(() => ServiceProduct, { cascade: true, eager: true })
    @JoinColumn({ name: 'servico_id' })
    serviceProduct: ServiceProduct;

    @ManyToMany(() => Provider, provider => provider.contracts)
    @JoinTable({
        name: 'provider_has_contracts',
        joinColumn: { name: 'contracts_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'provider_id', referencedColumnName: 'id' }
    })
    provider: Provider[];
}