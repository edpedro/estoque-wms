import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionUseCase } from '../usecases/create-permission.usecase';
import { ListPermissionUseCase } from '../usecases/list-permissions.usecase';
import { ListPermissionIdUseCase } from '../usecases/list-permission-id.usecase';
import { UpdatePermissionUseCase } from '../usecases/update-permission.usecase';
import { DeletePermissionUseCase } from '../usecases/delete-permission.usecase';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { ListPermissionNameUseCase } from '../usecases/list-permission-name.usecase';

@Injectable()
export class PermissionService {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly listPermissionsUseCase: ListPermissionUseCase,
    private readonly listPermissionByIdUseCase: ListPermissionIdUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
    private readonly listPermissionNameUseCase: ListPermissionNameUseCase,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permissionExist = await this.listPermissionNameUseCase.execute(
      createPermissionDto.name,
    );
    if (permissionExist) {
      throw new HttpException('Permissão já cadastrado', HttpStatus.NOT_FOUND);
    }

    const permission =
      await this.createPermissionUseCase.execute(createPermissionDto);
    return permission;
  }

  async findAll() {
    return await this.listPermissionsUseCase.execute();
  }

  async findOne(id: number) {
    const permission = await this.listPermissionByIdUseCase.execute(id);
    if (!permission) {
      throw new HttpException('Permissão não encontrada', HttpStatus.NOT_FOUND);
    }
    return permission;
  }

  async update(id: number, data: UpdatePermissionDto) {
    const permissionExist = await this.listPermissionByIdUseCase.execute(id);
    if (!permissionExist) {
      throw new HttpException('Permissão não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedPermission = await this.updatePermissionUseCase.execute(
        id,
        data,
      );
      return updatedPermission;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Permissão não atualizada',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    const permissionExist = await this.listPermissionByIdUseCase.execute(id);
    if (!permissionExist) {
      throw new HttpException('Permissão não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      await this.deletePermissionUseCase.execute(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao deletar permissão',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
