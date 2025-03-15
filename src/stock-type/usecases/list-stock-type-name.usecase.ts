import { Injectable } from '@nestjs/common';
import { StockTypeRepository } from '../repositories/stock-type.repository';
import { StockTypeDto } from '../dto/stock-type.dto';

@Injectable()
export class ListStockTypeNameUseCase {
  constructor(private readonly stockTypeRepository: StockTypeRepository) {}

  async execute(name: string): Promise<StockTypeDto | null> {
    return this.stockTypeRepository.findByName(name);
  }
}
