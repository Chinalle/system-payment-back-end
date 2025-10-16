import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryDto } from 'src/dtos/category/category.dto';
import { CreateCategoryDto } from 'src/dtos/category/create-category.dto';
import { CategoryService } from './category.service';
import type { Category } from 'src/entities/category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBody({
    type: CreateCategoryDto,
  })
  @ApiCreatedResponse({
    type: CategoryDto,
  })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @ApiCreatedResponse({
    isArray: true,
    type: CategoryDto,
  })
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @ApiParam({
    name: 'categoryId',
  })
  @ApiCreatedResponse({
    type: CategoryDto,
  })
  @Get(':categoryId')
  async findById(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return await this.categoryService.findById(categoryId);
  }

  @ApiParam({
    name: 'slug',
  })
  @ApiCreatedResponse({
    type: CategoryDto,
  })
  @Get(':slug')
  async findBySlug(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return await this.categoryService.findBySlug(categoryId);
  }
}
