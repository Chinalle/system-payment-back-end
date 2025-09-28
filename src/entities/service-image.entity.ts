import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_image')
export class ServiceImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Service, (service) => service.images, {
    onDelete: 'CASCADE',
  })
  service: Service;
}
