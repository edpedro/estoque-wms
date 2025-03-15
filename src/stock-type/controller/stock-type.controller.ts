import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StockTypeService } from '../service/stock-type.service';
import { CreateStockTypeDto } from '../dto/create-stock-type.dto';
import { UpdateStockTypeDto } from '../dto/update-stock-type.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('stock-type')
@UseGuards(AuthGuard('jwt'))
export class StockTypeController {
  constructor(private readonly stockTypeService: StockTypeService) {}

  @Post()
  @Roles('stock-type_create')
  create(
    @Body() createStockTypeDto: CreateStockTypeDto,
    @Req() req: ReqUserDto,
  ) {
    return this.stockTypeService.create(createStockTypeDto, req);
  }

  @Get()
  @Roles('stock-type_read')
  findAll() {
    return this.stockTypeService.findAll();
  }

  @Get(':id')
  @Roles('stock-type_read')
  findOne(@Param('id') id: string) {
    return this.stockTypeService.findOne(+id);
  }

  @Patch(':id')
  @Roles('stock-type_update')
  update(
    @Param('id') id: string,
    @Body() updateStockTypeDto: UpdateStockTypeDto,
  ) {
    return this.stockTypeService.update(+id, updateStockTypeDto);
  }

  @Delete(':id')
  @Roles('stock-type_delete')
  remove(@Param('id') id: string) {
    return this.stockTypeService.remove(+id);
  }
}
