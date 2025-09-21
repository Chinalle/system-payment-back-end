import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany } from 'typeorm';
import { TipoPerfil } from './enum';
import { Login } from './login.entity';
import { Empresa } from './empresa.entity';
import { Contrato } from './contratos.entity';

@Entity('prestadores')
export class Prestador {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    nome: string;

    @Column({
        type: 'enum',
        enum: TipoPerfil,
    })
    perfil: TipoPerfil;

    @OneToOne(() => Login, { cascade: true, eager: true })
    @JoinColumn({ name: 'login_id' })
    login: Login;

    @ManyToOne(() => Empresa, { nullable: true })
    @JoinColumn({ name: 'empresa_id' })
    empresa: Empresa;

    @ManyToMany(() => Contrato, contrato => contrato.prestadores)
    contratos: Contrato[];
}