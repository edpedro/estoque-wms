import { Injectable } from '@nestjs/common';
import { ListStockIdUseCase } from '../usecases/list-stock-id.usecase';
import { ListStockUseCase } from '../usecases/list-stock.usecase';

@Injectable()
export class StockService {
  constructor(
    private readonly listStockIdUseCase: ListStockIdUseCase,
    private readonly listStockUseCase: ListStockUseCase,
  ) {}

  async findAll() {
    return await this.listStockUseCase.execute();
  }

  async findOne(id: number) {
    return await this.listStockIdUseCase.execute(id);
  }
}
