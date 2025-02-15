import { cnpj } from 'cpf-cnpj-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from '../dto/create-items.dto';
import { UpdateItemsDto } from '../dto/update-items.dto';
import { ItemsDto } from '../dto/items.dto';

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createItems(data: CreateItemDto) {
    return await this.prisma.item.create({
      data,
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        companyId: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        companyId: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }

  async findByCODE(code: string) {
    return await this.prisma.item.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        companyId: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }

  async findAllItems(): Promise<ItemsDto[]> {
    return await this.prisma.item.findMany({
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        companyId: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }

  async updateCompany(id: number, data: UpdateItemsDto) {
    return await this.prisma.item.update({
      where: { id },
      data,
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        companyId: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
          },
        },
      },
    });
  }

  async removeCompany(id: number) {
    return await this.prisma.item.delete({
      where: { id },
    });
  }
}
