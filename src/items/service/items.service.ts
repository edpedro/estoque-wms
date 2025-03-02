import { BlockedItemsUseCase } from './../usecases/blocked-items.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemsUseCase } from '../usecases/create-items.usecase';
import { ListItemsUseCase } from '../usecases/list-items.usecase';
import { ListItemsIdUseCase } from '../usecases/list-items-id.usecase';
import { UpdateItemsUseCase } from '../usecases/update-items.usecase';
import { DeleteItemsUseCase } from '../usecases/delete-items.usecase';
import { CreateItemDto } from '../dto/create-items.dto';
import { UpdateItemsDto } from '../dto/update-items.dto';
import { ListItemsCodeUseCase } from '../usecases/list-items-code.usecase';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class ItemsService {
  constructor(
    private readonly createItemsUseCase: CreateItemsUseCase,
    private readonly listItemsUseCase: ListItemsUseCase,
    private readonly listItemsIdUseCase: ListItemsIdUseCase,
    private readonly updateItemsUseCase: UpdateItemsUseCase,
    private readonly deleteItemsUseCase: DeleteItemsUseCase,
    private readonly listItemsCodeUseCase: ListItemsCodeUseCase,
    private readonly blockedItemsUseCase: BlockedItemsUseCase,
  ) {}

  async create(createItemDto: CreateItemDto, req: ReqUserDto) {
    const itemExist = await this.listItemsCodeUseCase.execute(
      createItemDto.code,
    );
    if (itemExist) {
      throw new HttpException('Código já cadastrado', HttpStatus.NOT_FOUND);
    }

    if (createItemDto.weight) {
      if (Math.sign(createItemDto.weight) < 0) {
        throw new HttpException(
          'Peso não pode ser negativo',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    try {
      const items = await this.createItemsUseCase.execute(
        createItemDto,
        req.user.id,
      );

      return items;
    } catch (error) {
      throw new HttpException('Código não cadastrado', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    return await this.listItemsUseCase.execute();
  }

  async findOne(id: number) {
    const items = await this.listItemsIdUseCase.execute(id);
    if (!items) {
      throw new HttpException('Código não encontrada', HttpStatus.NOT_FOUND);
    }
    return items;
  }

  async update(id: number, data: UpdateItemsDto) {
    const itemExist = await this.listItemsIdUseCase.execute(id);
    if (!itemExist) {
      throw new HttpException('Código não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedItem = await this.updateItemsUseCase.execute(id, data);
      return updatedItem;
    } catch (error) {
      throw new HttpException('Codigo não atualizada', HttpStatus.BAD_REQUEST);
    }
  }

  async blocked(id: number, data: UpdateItemsDto) {
    const itemExist = await this.listItemsIdUseCase.execute(id);
    if (!itemExist) {
      throw new HttpException('Código não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedItem = await this.blockedItemsUseCase.execute(id, data);
      return updatedItem;
    } catch (error) {
      throw new HttpException('Codigo não bloqueado', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const itemExist = await this.listItemsIdUseCase.execute(id);
    if (!itemExist) {
      throw new HttpException('Codigo não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      await this.deleteItemsUseCase.execute(id);
    } catch (error) {
      throw new HttpException('Erro ao deletar Codigo', HttpStatus.BAD_REQUEST);
    }
  }
}
