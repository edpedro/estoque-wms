import { DeleteStockTypeUseCase } from './../usecases/delete-stock-type.usecase';
import { UpdateStockTypeUseCase } from './../usecases/update-stock-type.usecase';
import { CreateStockTypeUseCase } from './../usecases/create-stock-type.usecase';
import { ListStockTypeIdUseCase } from './../usecases/list-stock-type-id.usecase';
import { ListCompanyIdUseCase } from './../../company/usecases/list-company-id.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockTypeDto } from '../dto/create-stock-type.dto';
import { UpdateStockTypeDto } from '../dto/update-stock-type.dto';
import { ListStockTypeNameUseCase } from '../usecases/list-stock-type-name.usecase';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListStockTypeUseCase } from '../usecases/list-stock-type.usecase';

@Injectable()
export class StockTypeService {
  constructor(
    private readonly listCompanyIdUseCase: ListCompanyIdUseCase,
    private readonly listStockTypeNameUseCase: ListStockTypeNameUseCase,
    private readonly createStockTypeUseCase: CreateStockTypeUseCase,
    private readonly listStockTypeUseCase: ListStockTypeUseCase,
    private readonly listStockTypeIdUseCase: ListStockTypeIdUseCase,
    private readonly updateStockTypeUseCase: UpdateStockTypeUseCase,
    private readonly deleteStockTypeUseCase: DeleteStockTypeUseCase,
  ) {}
  async create(createStockTypeDto: CreateStockTypeDto, req: ReqUserDto) {
    if (createStockTypeDto.companyId) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        createStockTypeDto.companyId,
      );

      if (!companyExits) {
        throw new HttpException('Empresa não cadastrada', HttpStatus.NOT_FOUND);
      }

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    const stockTypeExist = await this.listStockTypeNameUseCase.execute(
      createStockTypeDto.name,
    );

    if (stockTypeExist) {
      throw new HttpException('Nome já cadastrado', HttpStatus.NOT_FOUND);
    }

    try {
      const stockType = await this.createStockTypeUseCase.execute(
        createStockTypeDto,
        req.user.id,
      );
      return stockType;
    } catch (error) {
      throw new HttpException(
        'Tipo de estoque não cadastrado',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll() {
    return await this.listStockTypeUseCase.execute();
  }

  async findOne(id: number) {
    const stockType = await this.listStockTypeIdUseCase.execute(id);

    if (!stockType) {
      throw new HttpException('Dados não cadastrado', HttpStatus.NOT_FOUND);
    }

    return stockType;
  }

  async update(id: number, updateStockTypeDto: UpdateStockTypeDto) {
    const stockTypeExist = await this.listStockTypeIdUseCase.execute(id);

    if (!stockTypeExist) {
      throw new HttpException('Dados não cadastrado', HttpStatus.NOT_FOUND);
    }

    if (updateStockTypeDto.companyId) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        updateStockTypeDto.companyId,
      );

      if (!companyExits) {
        throw new HttpException('Empresa não cadastrada', HttpStatus.NOT_FOUND);
      }

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    try {
      const update = await this.updateStockTypeUseCase.execute(
        id,
        updateStockTypeDto,
      );

      return update;
    } catch (error) {}
  }

  async remove(id: number) {
    const stockTypeExist = await this.listStockTypeIdUseCase.execute(id);

    if (!stockTypeExist) {
      throw new HttpException('Dados não cadastrado', HttpStatus.NOT_FOUND);
    }

    try {
      return await this.deleteStockTypeUseCase.execute(id);
    } catch (error) {
      throw new HttpException('Dados não deletado', HttpStatus.NOT_FOUND);
    }
  }
}
