import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import type { Repository } from 'typeorm';
import type { CreateCategoryDto } from 'src/dtos/category/create-category.dto';
import type { IServicePricingRepository } from './service-pricing.repository.interface';

@Injectable()
export class CategoryRepository implements IServicePricingRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    console.log('created category object', newCategory);
    return this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findById(categoryId: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: {
        slug: slug,
      },
    });
  }
}
