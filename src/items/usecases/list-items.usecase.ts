import { ItemsDto } from '../dto/items.dto';
import { ItemsRepository } from '../repositories/items.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListItemsUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(): Promise<ItemsDto[]> {
    return this.itemsRepository.findAllItems();
  }
}
