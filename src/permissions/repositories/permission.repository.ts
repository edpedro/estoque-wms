import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionDto } from '../dto/permission.dto';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPermission(data: CreatePermissionDto) {
    return await this.prisma.permission.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.permission.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findByName(name: string) {
    return await this.prisma.permission.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        description: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAllPermissions(): Promise<PermissionDto[]> {
    return await this.prisma.permission.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async updatePermission(id: number, data: UpdatePermissionDto) {
    return await this.prisma.permission.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async removePermission(id: number) {
    return await this.prisma.permission.delete({
      where: { id },
    });
  }
}
