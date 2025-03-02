import { cnpj } from 'cpf-cnpj-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from '../dto/create-items.dto';
import { UpdateItemsDto } from '../dto/update-items.dto';
import { ItemsDto } from '../dto/items.dto';

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createItems(data: CreateItemDto, idUser: string) {
    const result = await this.prisma.items.create({
      data: {
        ...data,
        create_id: idUser,
      },
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    const item: ItemsDto = {
      ...result,
      weight: result.weight ? result.weight.toNumber() : null,
    };

    return item;
  }

  async findById(id: number): Promise<ItemsDto | null> {
    const result = await this.prisma.items.findUnique({
      where: { id },
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    const item: ItemsDto = {
      ...result,
      weight: result.weight ? result.weight.toNumber() : null,
    };

    return item;
  }

  async findByCODE(code: string) {
    const result = await this.prisma.items.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    const item: ItemsDto = {
      ...result,
      weight: result.weight ? result.weight.toNumber() : null,
    };

    return item;
  }

  async findAllItems(): Promise<ItemsDto[]> {
    const result = await this.prisma.items.findMany({
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });

    const items: ItemsDto[] = result.map((item) => ({
      ...item,
      weight: item.weight ? item.weight.toNumber() : null,
    }));

    return items;
  }

  async updateItems(id: number, data: UpdateItemsDto) {
    return await this.prisma.items.update({
      where: { id },
      data,
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async removeItems(id: number) {
    return await this.prisma.items.delete({
      where: { id },
    });
  }

  async blockedItems(id: number, data: UpdateItemsDto) {
    return await this.prisma.items.update({
      where: { id },
      data: {
        isBlocked: data.isBlocked,
      },
      select: {
        id: true,
        code: true,
        description: true,
        category: true,
        weight: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }
}
