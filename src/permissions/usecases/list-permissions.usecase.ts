import { PermissionDto } from '../dto/permission.dto';
import { PermissionRepository } from '../repositories/permission.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListPermissionUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(): Promise<PermissionDto[]> {
    return this.permissionRepository.findAllPermissions();
  }
}
