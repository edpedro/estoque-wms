import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';
import { PermissionDto } from '../dto/permission.dto';

@Injectable()
export class ListPermissionNameUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(name: string): Promise<PermissionDto | null> {
    return this.permissionRepository.findByName(name);
  }
}
