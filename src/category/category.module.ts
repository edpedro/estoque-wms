import { Module } from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import { CategoryRepository } from './repositories/category.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCategoryUseCase } from './usecase/update-category.usecase';
import { ListCategoryUseCase } from './usecase/list-category.usecase';
import { ListCategoryIdUseCase } from './usecase/list-category-id.usecase';
import { DeleteCategoryUseCase } from './usecase/delete-category.usecase';
import { CreateCategoryUseCase } from './usecase/create-category.usecase';
import { ListCompanyIdUseCase } from '../company/usecases/list-company-id.usecase';
import { CompanyRepository } from 'src/company/repositories/company.repository';
import { ListCategoryNameUseCase } from './usecase/list-category-name.usecase';

@Module({
  controllers: [CategoryController],
  providers: [
    CategoryService,
    PrismaService,
    CategoryRepository,
    CompanyRepository,
    UpdateCategoryUseCase,
    ListCategoryUseCase,
    ListCategoryIdUseCase,
    DeleteCategoryUseCase,
    CreateCategoryUseCase,
    ListCategoryNameUseCase,
    ListCompanyIdUseCase,
  ],
})
export class CategoryModule {}
