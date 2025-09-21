import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { StatusContrato } from './enum';
import { User } from './users.entity';
import { Empresa } from './empresa.entity';
import { Pagamento } from './pagamento.entity';
import { Prestador } from './prestador.entity';
import { ServicoProduto } from './servicos-produtos.entity';
import { Timestamp } from 'typeorm/browser';

@Entity('contratos')
export class Contrato {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    data_contratacao: Timestamp;

    @Column({ type: 'double precision' })
    valor_total: number;

    @Column({
        type: 'enum',
        enum: StatusContrato,
        default: StatusContrato.PENDENTE,
    })
    status: StatusContrato;

    @Column({ type: 'date', nullable: true })
    prazo: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    cliente: User;

    @ManyToOne(() => Empresa)
    @JoinColumn({ name: 'empresa_id' })
    empresa: Empresa;

    @OneToOne(() => Pagamento, { cascade: true, eager: true })
    @JoinColumn({ name: 'pagamento_id' })
    pagamento: Pagamento;

    @OneToOne(() => ServicoProduto, { cascade: true, eager: true })
    @JoinColumn({ name: 'servico_id' })
    servicoProduto: ServicoProduto;

    @ManyToMany(() => Prestador, prestador => prestador.contratos)
    @JoinTable({
        name: 'prestadores_has_contratos',
        joinColumn: { name: 'contratos_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'prestador_id', referencedColumnName: 'id' }
    })
    prestadores: Prestador[];
}