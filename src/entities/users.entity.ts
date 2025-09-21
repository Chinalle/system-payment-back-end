import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { TipoPerfil } from './enum';
import { Login } from './login.entity';
import { Endereco } from './endereco.entity';
import { Timestamp } from 'typeorm/browser';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nome_completo: string;

    @Column({ type: 'varchar', length: 45 })
    telefone: string;

    @Column({ type: 'varchar', length: 45, unique: true })
    cpf_cnpj: string;

    @Column({ type: 'date' })
    data_nascimento: Date;

    @Column({
        type: 'enum',
        enum: TipoPerfil,
    })
    tipo_perfil: TipoPerfil;

    @Column({ type: 'boolean', name: 'is_active' })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
    updatedAt: Date;

    @Column({ type: 'boolean', default: true })
    isClient: boolean;

    @OneToOne(() => Login)
    @JoinColumn({ name: 'login_id' })
    login: Login;

    @OneToOne(() => Endereco)
    @JoinColumn({ name: 'endereco_id' })
    endereco: Endereco;
}