import { Module } from '@nestjs/common';
import { CompanyService } from './service/items.service';
import { ItemsController } from './controller/items.controller';
import { CreateCompanyUseCase } from './usecases/create-items.usecase';
import { DeleteCompanyUseCase } from './usecases/delete-items.usecase';
import { ListCompanyIdUseCase } from './usecases/list-items-id.usecase';
import { ListCompanyUseCase } from './usecases/list-items.usecase';
import { UpdateCompanyUseCase } from './usecases/update-items.usecase';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyRepository } from './repositories/items.repository';
import { ListCompanyCNPJUseCase } from './usecases/list-items-cnpj.usecase';

@Module({
  controllers: [ItemsController],
  providers: [
    CompanyService,
    PrismaService,
    CompanyRepository,
    CreateCompanyUseCase,
    DeleteCompanyUseCase,
    ListCompanyIdUseCase,
    ListCompanyUseCase,
    UpdateCompanyUseCase,
    ListCompanyCNPJUseCase,
  ],
})
export class ItemsModule {}
