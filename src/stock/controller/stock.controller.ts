import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { CreateStockDto } from '../dto/create-stock.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { StockService } from '../service/stock.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @Roles('stock_read')
  findAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  @Roles('stock_read')
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(+id);
  }
}
