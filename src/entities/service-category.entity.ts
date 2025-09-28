import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('service_category')
export class ServiceCategory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 45 })
    category: string;
}