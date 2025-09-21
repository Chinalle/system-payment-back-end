import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('login')
export class Login {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    senha: string;
}