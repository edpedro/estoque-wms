import { Injectable } from '@nestjs/common';
import { StockTypeRepository } from '../repositories/stock-type.repository';
import { CreateStockTypeDto } from '../dto/create-stock-type.dto';
import { StockTypeDto } from '../dto/stock-type.dto';

@Injectable()
export class CreateStockTypeUseCase {
  constructor(private readonly stockTypeRepository: StockTypeRepository) {}

  async execute(
    data: CreateStockTypeDto,
    idUser: string,
  ): Promise<StockTypeDto> {
    return this.stockTypeRepository.createStockType(data, idUser);
  }
}
