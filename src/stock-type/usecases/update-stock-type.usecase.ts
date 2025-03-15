import { Injectable } from '@nestjs/common';
import { StockTypeRepository } from '../repositories/stock-type.repository';
import { UpdateStockTypeDto } from '../dto/update-stock-type.dto';

@Injectable()
export class UpdateStockTypeUseCase {
  constructor(private readonly stockTypeRepository: StockTypeRepository) {}

  async execute(id: number, data: UpdateStockTypeDto) {
    return this.stockTypeRepository.updateStockType(id, data);
  }
}
