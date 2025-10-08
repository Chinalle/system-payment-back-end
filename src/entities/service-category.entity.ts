import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_category')
export class ServiceCategory {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 45 })
  category: string;

  @OneToMany(() => Service, (service) => service.category)
  services: Service[];
}
