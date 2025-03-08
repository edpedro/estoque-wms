import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class ListCategoryIdUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number): Promise<CategoryDto | null> {
    return this.categoryRepository.findById(id);
  }
}
