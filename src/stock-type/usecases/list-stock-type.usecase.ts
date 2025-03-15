import { Injectable } from '@nestjs/common';
import { StockTypeRepository } from '../repositories/stock-type.repository';
import { StockTypeDto } from '../dto/stock-type.dto';

@Injectable()
export class ListStockTypeUseCase {
  constructor(private readonly stockTypeRepository: StockTypeRepository) {}

  async execute(): Promise<StockTypeDto[]> {
    return this.stockTypeRepository.findAllStockType();
  }
}
