import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '../repositories/permission.repository';
import { PermissionDto } from '../dto/permission.dto';

@Injectable()
export class ListPermissionIdUseCase {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async execute(id: number): Promise<PermissionDto | null> {
    return this.permissionRepository.findById(id);
  }
}
