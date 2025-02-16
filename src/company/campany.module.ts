import { Module } from '@nestjs/common';
import { CompanyService } from './service/company.service';
import { CampanyController } from './controller/company.controller';
import { CreateCompanyUseCase } from './usecases/create-company.usecase';
import { DeleteCompanyUseCase } from './usecases/delete-company.usecase';
import { ListCompanyIdUseCase } from './usecases/list-company-id.usecase';
import { ListCompanyUseCase } from './usecases/list-company.usecase';
import { UpdateCompanyUseCase } from './usecases/update-company.usecase';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyRepository } from './repositories/company.repository';
import { ListCompanyCNPJUseCase } from './usecases/list-company-cnpj.usecase';
import { BlockedCompanyUseCase } from './usecases/blocked-company.usecase';

@Module({
  controllers: [CampanyController],
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
    BlockedCompanyUseCase,
  ],
})
export class CampanyModule {}
