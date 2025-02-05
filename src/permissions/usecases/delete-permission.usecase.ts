import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';

@Injectable()
export class DeletePermissionUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(id: number) {
    return this.permissionRepository.removePermission(id);
  }
}
