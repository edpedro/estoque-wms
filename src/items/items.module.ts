import { Module } from '@nestjs/common';
import { ItemsService } from './service/items.service';
import { ItemsController } from './controller/items.controller';
import { CreateItemsUseCase } from './usecases/create-items.usecase';
import { DeleteItemsUseCase } from './usecases/delete-items.usecase';
import { ListItemsIdUseCase } from './usecases/list-items-id.usecase';
import { ListItemsUseCase } from './usecases/list-items.usecase';
import { UpdateItemsUseCase } from './usecases/update-items.usecase';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemsRepository } from './repositories/items.repository';
import { ListItemsCodeUseCase } from './usecases/list-items-code.usecase';
import { BlockedItemsUseCase } from './usecases/blocked-items.usecase';

@Module({
  controllers: [ItemsController],
  providers: [
    ItemsService,
    PrismaService,
    ItemsRepository,
    CreateItemsUseCase,
    DeleteItemsUseCase,
    ListItemsIdUseCase,
    ListItemsUseCase,
    UpdateItemsUseCase,
    ListItemsCodeUseCase,
    BlockedItemsUseCase,
  ],
})
export class ItemsModule {}
