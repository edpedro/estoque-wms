import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionDto } from '../dto/permission.dto';

@Injectable()
export class CreatePermissionUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(data: CreatePermissionDto): Promise<PermissionDto> {
    return this.permissionRepository.createPermission(data);
  }
}
