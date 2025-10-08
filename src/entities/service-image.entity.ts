import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_image')
export class ServiceImage {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Service, (service) => service.images)
  @JoinColumn({ name: 'serviceId' })
  service: Service;
}
