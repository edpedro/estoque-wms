import { CreateCategoryUseCase } from './../usecase/create-category.usecase';
import { ListCategoryNameUseCase } from './../usecase/list-category-name.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListCompanyIdUseCase } from 'src/company/usecases/list-company-id.usecase';
import { ListCategoryUseCase } from '../usecase/list-category.usecase';
import { ListCategoryIdUseCase } from '../usecase/list-category-id.usecase';
import { UpdateCategoryUseCase } from '../usecase/update-category.usecase';
import { DeleteCategoryUseCase } from '../usecase/delete-category.usecase';

@Injectable()
export class CategoryService {
  constructor(
    private readonly listCompanyIdUseCase: ListCompanyIdUseCase,
    private readonly listCategoryNameUseCase: ListCategoryNameUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly listCategoryUseCase: ListCategoryUseCase,
    private readonly listCategoryIdUseCase: ListCategoryIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, req: ReqUserDto) {
    if (createCategoryDto.companyId) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        createCategoryDto.companyId,
      );

      if (!companyExits) {
        throw new HttpException('Empresa não cadastrada', HttpStatus.NOT_FOUND);
      }

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    const categoryExits = await this.listCategoryNameUseCase.execute(
      createCategoryDto.name,
    );
    if (categoryExits) {
      throw new HttpException('Nome já cadastrado', HttpStatus.NOT_FOUND);
    }

    try {
      const category = await this.createCategoryUseCase.execute(
        createCategoryDto,
        req.user.id,
      );

      return category;
    } catch (error) {
      throw new HttpException('Código não cadastrado', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    return await this.listCategoryUseCase.execute();
  }

  async findOne(id: number) {
    const category = await this.listCategoryIdUseCase.execute(id);

    if (!category) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if (updateCategoryDto.companyId) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        updateCategoryDto.companyId,
      );

      if (!companyExits) {
        throw new HttpException('Empresa não cadastrada', HttpStatus.NOT_FOUND);
      }

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    const category = await this.listCategoryIdUseCase.execute(id);

    if (!category) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      const updateCategory = await this.updateCategoryUseCase.execute(
        id,
        updateCategoryDto,
      );

      return updateCategory;
    } catch (error) {
      throw new HttpException('Codigo não atualizada', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const category = await this.listCategoryIdUseCase.execute(id);

    if (!category) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      await this.deleteCategoryUseCase.execute(id);
    } catch (error) {
      throw new HttpException(
        'Erro ao deletar Categoria',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
