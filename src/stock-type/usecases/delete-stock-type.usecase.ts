import { Injectable } from '@nestjs/common';
import { StockTypeRepository } from '../repositories/stock-type.repository';

@Injectable()
export class DeleteStockTypeUseCase {
  constructor(private readonly stockTypeRepository: StockTypeRepository) {}

  async execute(id: number) {
    return this.stockTypeRepository.removeStockType(id);
  }
}
