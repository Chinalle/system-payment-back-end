import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './enum';
import { Login } from './login.entity';
import { Address } from './address.entity';
import { Timestamp } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name_full: string;

    @Column({ type: 'varchar', length: 45 })
    telephone: string;

    @Column({ type: 'varchar', length: 45, unique: true })
    cpf_cnpj: string;

    @Column({ type: 'date' })
    birth_date: Date;

    @Column({
        type: 'enum',
        enum: Role,
    })
    role: Role;

    @Column({ type: 'boolean', name: 'is_active' })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Timestamp;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updatedAt: Timestamp;

    @OneToOne(() => Login)
    @JoinColumn({ name: 'login_id' })
    login: Login;

    @OneToOne(() => Address)
    @JoinColumn({ name: 'endereco_id' })
    address: Address;
}