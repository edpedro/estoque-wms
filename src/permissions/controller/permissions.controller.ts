import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from '../service/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('permissions')
@UseGuards(AuthGuard('jwt'))
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionService) {}

  @Post()
  @Roles('permission_create')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @Roles('permission_read')
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @Roles('permission_read')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('permission_update')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @Roles('permission_delete')
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
