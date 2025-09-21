import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    public_place: string;

    @Column({ type: 'varchar', length: 255 })
    district: string;

    @Column({ type: 'varchar', length: 45 })
    house_number: string;

    @Column({ type: 'varchar', length: 255 })
    city: string;

    @Column({ type: 'varchar', length: 255 })
    state: string;
}