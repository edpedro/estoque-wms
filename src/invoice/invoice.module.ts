import { Module } from '@nestjs/common';
import { InvoiceService } from './service/invoice.service';
import { InvoiceController } from './controller/invoice.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvoiceRepository } from './repositories/invoice.repository';
import { CreateInvoiceUseCase } from './usecases/create-invoice.usecase';
import { ListInvoiceIdUseCase } from './usecases/list-invoice-id.usecase';
import { ListInvoiceUseCase } from './usecases/list-invoice.usecase';
import { ListInvoiceNumberUseCase } from './usecases/list-invoice-number.usecase';
import { ListCompanyIdUseCase } from 'src/company/usecases/list-company-id.usecase';
import { CompanyRepository } from 'src/company/repositories/company.repository';
import { AddressRepository } from 'src/address/repositories/address.repository';
import { ListAddressIdUseCase } from 'src/address/usecases/list-address-id.usecase';
import { ItemsRepository } from 'src/items/repositories/items.repository';
import { ListItemsIdUseCase } from 'src/items/usecases/list-items-id.usecase';
import { StockTypeRepository } from 'src/stock-type/repositories/stock-type.repository';
import { ListStockTypeIdUseCase } from 'src/stock-type/usecases/list-stock-type-id.usecase';
import { DeleteInvoiceIdUseCase } from './usecases/delete-invoice.usecase';
import { UpdateInvoiceUseCase } from './usecases/update-invoice.usecase';
import { ListAllCancelledInvoiceUseCase } from './usecases/list-cancelled-invoice.usecase';
import { ListIdCancelledInvoiceUseCase } from './usecases/list-cancelled-invoice-id.usecase';

@Module({
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    PrismaService,
    InvoiceRepository,
    CompanyRepository,
    AddressRepository,
    ItemsRepository,
    StockTypeRepository,
    CreateInvoiceUseCase,
    ListInvoiceIdUseCase,
    ListInvoiceUseCase,
    ListInvoiceNumberUseCase,
    ListCompanyIdUseCase,
    ListAddressIdUseCase,
    ListItemsIdUseCase,
    ListStockTypeIdUseCase,
    DeleteInvoiceIdUseCase,
    UpdateInvoiceUseCase,
    ListAllCancelledInvoiceUseCase,
    ListIdCancelledInvoiceUseCase,
  ],
})
export class InvoiceModule {}
