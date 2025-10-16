import { Injectable } from '@nestjs/common';
import type { ICategoryRepository } from './category.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import type { Repository } from 'typeorm';
import type { CreateCategoryDto } from 'src/dtos/category/create-category.dto';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(category: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
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
