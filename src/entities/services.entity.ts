import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Company } from './company.entity';
import { Category } from './category.entity';
import { ServicePricing } from './service-pricing.entity';
import { ServicePortfolioImage } from './service-portfolio-images.entity';
import { QuotationRequestEntity } from './quotation-request.entity';

@Entity('services')
export class Services {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'requires_quotation', type: 'boolean' })
  requiresQuotation: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // Tables Relations

  @OneToMany(
    () => ServicePricing,
    (servicePricing) => servicePricing.services,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'service_pricing' })
  servicePricing: ServicePricing[];

  @OneToMany(
    () => ServicePortfolioImage,
    (servicePortfolioImage) => servicePortfolioImage.services,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'service_portfolio_image' })
  servicePortfolioImage: ServicePortfolioImage;

  @ManyToOne(() => Company, (company) => company.services, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Category, (category) => category.services)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
    () => QuotationRequestEntity,
    (quotationRequest) => quotationRequest.services,
    { nullable: true },
  )
  @JoinColumn({ name: 'quotation_request' })
  quotationRequest: QuotationRequestEntity[];
}
