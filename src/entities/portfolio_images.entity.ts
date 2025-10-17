import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Company } from './company.entity';
import { ServicePortfolioImage } from './service-portfolio-images.entity';

@Entity('portfolio_images')
export class PortfolioImages {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'image_base64', type: 'text' })
  imageBase64: string;

  @Column({ name: 'mime_type', type: 'text' })
  mimeType: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'display_order', type: 'int', nullable: true })
  displayOrder: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // Table relations

  @ManyToOne(() => Company, (company) => company.portfolioImages)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(
    () => ServicePortfolioImage,
    (servicePortfolioImage) => servicePortfolioImage.images,
  )
  @JoinColumn({ name: 'service_portfolio_image' })
  servicePortfolioImage: ServicePortfolioImage[];
}
