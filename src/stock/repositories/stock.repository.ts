import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockDto } from '../dto/stock.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class StockRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    const result = await this.prisma.stock.findUnique({
      where: { id },
      select: {
        id: true,
        item: {
          select: {
            id: true,
            code: true,
            description: true,
            isBlocked: true,
            createId: true,
            created_at: true,
            updated_at: true,
            category: {
              select: {
                id: true,
                name: true,
                createId: true,
                created_at: true,
                updated_at: true,
              },
            },
          },
        },
        address: {
          select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
          },
        },
        stockType: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        unitPrice: true,
        invoiceQuantity: true,
        reservedQuantity: true,
        currentBalance: true,
      },
    });

    if (!result) {
      return null;
    }

    return {
      ...result,
      unitPrice: Number(result.unitPrice),
    };
  }

  async findAllStock(): Promise<StockDto[]> {
    const result = await this.prisma.stock.findMany({
      select: {
        id: true,
        item: {
          select: {
            id: true,
            code: true,
            description: true,
            isBlocked: true,
            createId: true,
            created_at: true,
            updated_at: true,
            category: {
              select: {
                id: true,
                name: true,
                createId: true,
                created_at: true,
                updated_at: true,
              },
            },
          },
        },
        address: {
          select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
          },
        },
        stockType: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        unitPrice: true,
        invoiceQuantity: true,
        reservedQuantity: true,
        currentBalance: true,
      },
    });

    return result.map((stock) => ({
      ...stock,
      unitPrice:
        stock.unitPrice instanceof Decimal
          ? stock.unitPrice.toNumber()
          : stock.unitPrice,
    }));
  }
}
