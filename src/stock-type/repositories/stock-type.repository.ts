import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockTypeDto } from '../dto/create-stock-type.dto';
import { StockTypeDto } from '../dto/stock-type.dto';
import { UpdateStockTypeDto } from '../dto/update-stock-type.dto';

@Injectable()
export class StockTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createStockType(data: CreateStockTypeDto, idUser: string) {
    const result = await this.prisma.stockType.create({
      data: {
        name: data.name,
        createId: idUser,
        companyId: data.companyId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
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

    return result;
  }

  async findById(id: number): Promise<StockTypeDto | null> {
    const result = await this.prisma.stockType.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
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

    return result;
  }

  async findByName(name: string) {
    const result = await this.prisma.stockType.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
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

    return result;
  }

  async findAllStockType(): Promise<StockTypeDto[]> {
    const result = await this.prisma.stockType.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
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

    return result;
  }

  async updateStockType(id: number, data: UpdateStockTypeDto) {
    return await this.prisma.stockType.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
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

  async removeStockType(id: number) {
    return await this.prisma.stockType.delete({
      where: { id },
    });
  }
}
