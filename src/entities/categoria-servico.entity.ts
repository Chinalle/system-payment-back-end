import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('categoria_servico')
export class CategoriaServico {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 45 })
    nome: string;
}