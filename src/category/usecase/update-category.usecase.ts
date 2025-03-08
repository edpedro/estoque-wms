import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/category.repository';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: number, data: UpdateCategoryDto) {
    return this.categoryRepository.updateCategory(id, data);
  }
}
