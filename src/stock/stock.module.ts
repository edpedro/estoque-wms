import { PrismaService } from './../prisma/prisma.service';
import { Module } from '@nestjs/common';
import { StockService } from './service/stock.service';
import { StockController } from './controller/stock.controller';
import { StockRepository } from './repositories/stock.repository';
import { ListStockIdUseCase } from './usecases/list-stock-id.usecase';
import { ListStockUseCase } from './usecases/list-stock.usecase';

@Module({
  controllers: [StockController],
  providers: [
    StockService,
    PrismaService,
    StockRepository,
    ListStockIdUseCase,
    ListStockUseCase,
  ],
})
export class StockModule {}
