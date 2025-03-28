import { Injectable } from '@nestjs/common';
import { StockRepository } from '../repositories/stock.repository';
import { StockDto } from '../dto/stock.dto';

@Injectable()
export class ListStockUseCase {
  constructor(private readonly stockRepository: StockRepository) {}

  async execute(): Promise<StockDto[]> {
    return this.stockRepository.findAllStock();
  }
}
