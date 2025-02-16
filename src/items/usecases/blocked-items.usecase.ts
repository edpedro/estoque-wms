import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../repositories/items.repository';
import { UpdateItemsDto } from '../dto/update-items.dto';

@Injectable()
export class BlockedItemsUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(id: number, data: UpdateItemsDto) {
    return this.itemsRepository.blockedItems(id, data);
  }
}
