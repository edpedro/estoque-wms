import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from '../service/items.service';
import { CreateItemDto } from '../dto/create-items.dto';
import { UpdateItemsDto } from '../dto/update-items.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('items')
@UseGuards(AuthGuard('jwt'))
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles('items_create')
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get()
  @Roles('items_read')
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @Roles('items_read')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('items_update')
  update(@Param('id') id: string, @Body() updateItemsDto: UpdateItemsDto) {
    return this.itemsService.update(+id, updateItemsDto);
  }

  @Patch('blocked/:id')
  @Roles('items_blocked')
  blocked(@Param('id') id: string, @Body() updateItemsDto: UpdateItemsDto) {
    return this.itemsService.update(+id, updateItemsDto);
  }

  @Delete(':id')
  @Roles('items_delete')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }
}
