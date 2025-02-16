import { Injectable } from '@nestjs/common';
import { ItemsRepository } from '../repositories/items.repository';
import { ItemsDto } from '../dto/items.dto';

@Injectable()
export class ListItemsCodeUseCase {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  async execute(code: string): Promise<ItemsDto | null> {
    return this.itemsRepository.findByCODE(code);
  }
}
