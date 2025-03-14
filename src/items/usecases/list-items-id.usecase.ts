import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../repositories/items.repository';
import { ItemsDto } from '../dto/items.dto';

@Injectable()
export class ListItemsIdUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(id: number): Promise<ItemsDto | null> {
    return this.itemsRepository.findById(id);
  }
}
