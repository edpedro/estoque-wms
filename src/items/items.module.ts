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
import { ListCompanyIdUseCase } from 'src/company/usecases/list-company-id.usecase';
import { CompanyRepository } from 'src/company/repositories/company.repository';

@Module({
  controllers: [ItemsController],
  providers: [
    ItemsService,
    PrismaService,
    ItemsRepository,
    CompanyRepository,
    CreateItemsUseCase,
    DeleteItemsUseCase,
    ListItemsIdUseCase,
    ListItemsUseCase,
    UpdateItemsUseCase,
    ListItemsCodeUseCase,
    BlockedItemsUseCase,
    ListCompanyIdUseCase,
  ],
})
export class ItemsModule {}
