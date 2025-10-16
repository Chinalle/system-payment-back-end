import type { CreateCategoryDto } from 'src/dtos/category/create-category.dto';
import type { Category } from 'src/entities/category.entity';

export interface ICategoryRepository {
  create(category: CreateCategoryDto): Promise<Category>;
  findAll(): Promise<Category[]>;
  findById(categoryId: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
}
