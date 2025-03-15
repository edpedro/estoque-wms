import { Module } from '@nestjs/common';
import { StockTypeService } from './service/stock-type.service';
import { StockTypeController } from './controller/stock-type.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockTypeRepository } from './repositories/stock-type.repository';
import { CreateStockTypeUseCase } from './usecases/create-stock-type.usecase';
import { DeleteStockTypeUseCase } from './usecases/delete-stock-type.usecase';
import { ListStockTypeIdUseCase } from './usecases/list-stock-type-id.usecase';
import { ListStockTypeNameUseCase } from './usecases/list-stock-type-name.usecase';
import { ListStockTypeUseCase } from './usecases/list-stock-type.usecase';
import { UpdateStockTypeUseCase } from './usecases/update-stock-type.usecase';
import { ListCompanyIdUseCase } from 'src/company/usecases/list-company-id.usecase';
import { CompanyRepository } from 'src/company/repositories/company.repository';

@Module({
  controllers: [StockTypeController],
  providers: [
    StockTypeService,
    PrismaService,
    StockTypeRepository,
    CompanyRepository,
    CreateStockTypeUseCase,
    DeleteStockTypeUseCase,
    ListStockTypeIdUseCase,
    ListStockTypeNameUseCase,
    ListStockTypeUseCase,
    UpdateStockTypeUseCase,
    ListCompanyIdUseCase,
  ],
})
export class StockTypeModule {}
