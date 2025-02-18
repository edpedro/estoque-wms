import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../repositories/items.repository';
import { CreateItemDto } from '../dto/create-items.dto';
import { ItemsDto } from '../dto/items.dto';

@Injectable()
export class CreateItemsUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(data: CreateItemDto): Promise<ItemsDto> {
    return this.itemsRepository.createItems(data);
  }
}
