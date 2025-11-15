import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { CompanyMember } from './company-member.entity';
import { PortfolioImages } from './portfolio_images.entity';
import { Services } from './services.entity';

@Entity('company')
export class Company {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  cnpj: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'logo_img', type: 'text', nullable: true })
  logoImg?: string;

  @Column({ name: 'business_hours', type: 'jsonb', nullable: true })
  businessHours?: Record<string, any>;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 5,
    nullable: true,
  })
  rating: number;

  @Column({ name: 'stripe_account_id', type: 'text' })
  stripeAccountId: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  // Table relations

  @OneToMany(() => Address, (address) => address.company)
  addresses?: Address[];

  @OneToMany(() => Services, (service) => service.company)
  services: Services[];

  @OneToMany(() => CompanyMember, (companyMember) => companyMember.company)
  companyMembers: CompanyMember[];

  // a empresa deve ter um portfolio (banco de imagens)
  @OneToMany(
    () => PortfolioImages,
    (portfolioImages) => portfolioImages.company,
    {
      nullable: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'portfolio_images' })
  portfolioImages: PortfolioImages[];
}
