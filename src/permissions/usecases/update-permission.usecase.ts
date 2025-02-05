import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class UpdatePermissionUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(id: number, data: UpdatePermissionDto) {
    return this.permissionRepository.updatePermission(id, data);
  }
}
