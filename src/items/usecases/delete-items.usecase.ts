import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../repositories/items.repository';

@Injectable()
export class DeleteItemsUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(id: number) {
    return this.itemsRepository.removeItems(id);
  }
}
