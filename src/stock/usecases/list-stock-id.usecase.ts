import { Injectable } from '@nestjs/common';
import { StockRepository } from '../repositories/stock.repository';
import { StockDto } from '../dto/stock.dto';

@Injectable()
export class ListStockIdUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async execute(id: number): Promise<StockDto | null> {
    return this.stockRepository.findById(id);
  }
}
