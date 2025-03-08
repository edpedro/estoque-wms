import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class ListCategoryNameUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(name: string): Promise<CategoryDto | null> {
    return this.categoryRepository.findByName(name);
  }
}
