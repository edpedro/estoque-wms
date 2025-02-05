import { Module } from '@nestjs/common';
import { PermissionService } from './service/permissions.service';
import { PermissionsController } from './controller/permissions.controller';
import { CreatePermissionUseCase } from './usecases/create-permission.usecase';
import { DeletePermissionUseCase } from './usecases/delete-permission.usecase';
import { ListPermissionIdUseCase } from './usecases/list-permission-id.usecase';
import { ListPermissionUseCase } from './usecases/list-permissions.usecase';
import { UpdatePermissionUseCase } from './usecases/update-permission.usecase';
import { PrismaService } from 'src/prisma/prisma.service';
import { PermissionRepository } from './repositories/permission.repository';
import { ListPermissionNameUseCase } from './usecases/list-permission-name.usecase';

@Module({
  controllers: [PermissionsController],
  providers: [
    PermissionService,
    PrismaService,
    PermissionRepository,
    CreatePermissionUseCase,
    DeletePermissionUseCase,
    ListPermissionIdUseCase,
    ListPermissionUseCase,
    UpdatePermissionUseCase,
    ListPermissionNameUseCase,
  ],
})
export class PermissionsModule {}
