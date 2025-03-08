import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class ListCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<CategoryDto[]> {
    return this.categoryRepository.findAllCategory();
  }
}
