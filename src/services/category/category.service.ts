import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ICategoryRepository } from './repository/category.repository.interface';
import type { CreateCategoryDto } from 'src/dtos/category/create-category.dto';
import type { Category } from 'src/entities/category.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    //TODO: Add validations when is duplicated category with slug definition
    // TODO: Add method to generate slug

    const generatedSlug = this.generateSlug(createCategoryDto.name);

    const existingCategory =
      await this.categoryRepository.findBySlug(generatedSlug);

    if (existingCategory) {
      throw new Error(`category ${generatedSlug} already exists`);
    }

    const categoryDto = {
      id: uuidv4(),
      name: createCategoryDto.name,
      slug: generatedSlug,
      isActive: createCategoryDto.isActive ?? true,
    };

    return await this.categoryRepository.create(categoryDto);
  }

  async findById(categoryId: string): Promise<Category | null> {
    const existingCategory = await this.categoryRepository.findById(categoryId);

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID: ${categoryId} Not found`);
    }

    return existingCategory;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const existingCategory = await this.categoryRepository.findBySlug(slug);

    if (!existingCategory) {
      throw new NotFoundException(`Category with this slug ${slug} not Found`);
    }

    return existingCategory;
  }

  private generateSlug(name: string) {
    const normalizedText = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return normalizedText
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
