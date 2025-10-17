import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Services } from './services.entity';
import { PortfolioImages } from './portfolio_images.entity';

@Entity('service_portfolio_image')
export class ServicePortfolioImage {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'portfolio_images_id', type: 'uuid' })
  portfolioImagesId: string;

  @Column({ name: 'service_id', type: 'uuid' })
  serviceId: string;

  // Table relations

  @ManyToOne(() => Services, (service) => service.servicePortfolioImage)
  @JoinColumn({ name: 'service_id' })
  services: Services;

  @ManyToOne(() => PortfolioImages, (images) => images.servicePortfolioImage)
  @JoinColumn({ name: 'portfolio_images' })
  images: PortfolioImages;
}
