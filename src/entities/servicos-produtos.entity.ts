// src/entities/servicos-produtos.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { CategoriaServico } from './categoria-servico.entity';
import { Pagamento } from './pagamento.entity';

@Entity('servicos_produtos')
export class ServicoProduto {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 45 })
    nome: string;

    @Column({ type: 'text', nullable: true })
    descricao: string;

    @Column({ type: 'integer', nullable: true })
    tempo_execucao_minutos: number;

    @Column({ type: 'double precision' })
    preco: number;

    @OneToOne(() => CategoriaServico)
    @JoinColumn({ name: 'categoria_id' })
    categoriaServico: CategoriaServico;

    @ManyToMany(() => Pagamento, pagamento => pagamento)
    pagamentos: Pagamento[];
}