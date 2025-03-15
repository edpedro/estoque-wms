import { Injectable } from '@nestjs/common';
import { StockTypeRepository } from '../repositories/stock-type.repository';
import { StockTypeDto } from '../dto/stock-type.dto';

@Injectable()
export class ListStockTypeIdUseCase {
  constructor(private readonly stockTypeRepository: StockTypeRepository) {}

  async execute(id: number): Promise<StockTypeDto | null> {
    return this.stockTypeRepository.findById(id);
  }
}
