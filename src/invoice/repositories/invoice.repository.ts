import { CancelledInvoiceDto } from './../dto/cancelled-invoice.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { InvoiceDto } from '../dto/invoice.dto';
import { mapToInvoiceDto } from '../utils/mapToinvoiceDto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';

@Injectable()
export class InvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInvoice(data: CreateInvoiceDto, idUser: string) {
    const result = await this.prisma.$transaction(async (prisma) => {
      // Criar a nota fiscal
      const invoice = await prisma.invoice.create({
        data: {
          number: data.number,
          series: data.series,
          divergence: data.divergence ?? false,
          issue_date: new Date(data.issueDate),
          entry_date: new Date(data.entryDate),
          totalNf_value: data.totalNfValue,
          divergenceReason: data.divergenceReason,
          companyId: data.companyId,
          createId: idUser,
        },
        select: {
          id: true, // Certifique-se de que o campo `id` está sendo selecionado
          number: true,
          series: true,
          totalNf_value: true,
          divergenceReason: true,
          divergence: true,
          issue_date: true,
          entry_date: true,
          status: true,
          cancellationReason: true,
          userCancelledId: true,
          isInvoiceCancelled: true,
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

      // Criar os registros no Stock vinculados à nota fiscal
      await prisma.stock.createMany({
        data: data.items.map((item) => ({
          invoiceId: invoice.id,
          itemId: item.itemId,
          addressId: item.addressId ?? null,
          stockTypeId: item.stockTypeId ?? null,
          companyId: data.companyId,
          lastUpdatedBy: idUser,
          reservedQuantity: 0,
          divergenceItem: item.divergenceItem,
          invoiceQuantity: item.invoiceQuantity,
          divergenceQuantity: item.divergenceQuantity ?? 0,
          currentBalance: item.divergenceQuantity ?? item.invoiceQuantity,
          unitPrice: item.unitPrice,
        })),
        skipDuplicates: true,
      });

      // Consultar a nota fiscal novamente, incluindo os itens do estoque
      const invoiceWithStock = await prisma.invoice.findUnique({
        where: { id: invoice.id },
        select: {
          id: true,
          number: true,
          series: true,
          divergence: true,
          entry_date: true,
          issue_date: true,
          totalNf_value: true,
          divergenceReason: true,
          status: true,
          cancellationReason: true,
          userCancelledId: true,
          isInvoiceCancelled: true,
          created_at: true,
          updated_at: true,
          Stock: {
            select: {
              id: true,
              item: true,
              currentBalance: true,
              divergenceQuantity: true,
              invoiceQuantity: true,
              reservedQuantity: true,
              unitPrice: true,
              address: true,
              stockType: true,
              lastUpdatedBy: true,
              divergenceItem: true,
              status: true,
              invoice: true,
              company: true,
              updatedByUser: {
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
          },
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

      return invoiceWithStock;
    });

    return result;
  }

  async findById(id: number): Promise<InvoiceDto | null> {
    const result = await this.prisma.invoice.findUnique({
      where: { id: id, isInvoiceCancelled: false },
      select: {
        id: true,
        number: true,
        series: true,
        divergence: true,
        entry_date: true,
        issue_date: true,
        totalNf_value: true,
        divergenceReason: true,
        status: true,
        cancellationReason: true,
        userCancelledId: true,
        isInvoiceCancelled: true,
        created_at: true,
        updated_at: true,
        Stock: {
          select: {
            id: true,
            item: true,
            currentBalance: true,
            divergenceQuantity: true,
            invoiceQuantity: true,
            reservedQuantity: true,
            unitPrice: true,
            address: true,
            stockType: true,
            lastUpdatedBy: true,
            divergenceItem: true,
            status: true,
            invoice: true,
            company: true,
            updatedByUser: {
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
        },
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

    return result ? mapToInvoiceDto(result) : null;
  }

  async findAllInvoice(): Promise<InvoiceDto[]> {
    const result = await this.prisma.invoice.findMany({
      where: { isInvoiceCancelled: false },
      select: {
        id: true,
        number: true,
        series: true,
        divergence: true,
        entry_date: true,
        issue_date: true,
        totalNf_value: true,
        divergenceReason: true,
        status: true,
        cancellationReason: true,
        userCancelledId: true,
        isInvoiceCancelled: true,
        created_at: true,
        updated_at: true,
        Stock: {
          select: {
            id: true,
            item: true,
            currentBalance: true,
            divergenceQuantity: true,
            invoiceQuantity: true,
            reservedQuantity: true,
            unitPrice: true,
            address: true,
            stockType: true,
            lastUpdatedBy: true,
            divergenceItem: true,
            status: true,
            invoice: true,
            company: true,
            updatedByUser: {
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
        },
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

    return result.map(mapToInvoiceDto);
  }

  async findByNumber(number: string): Promise<InvoiceDto | null> {
    const result = await this.prisma.invoice.findFirst({
      where: { number: number, isInvoiceCancelled: false },
      select: {
        id: true,
        number: true,
        series: true,
        divergence: true,
        entry_date: true,
        issue_date: true,
        totalNf_value: true,
        divergenceReason: true,
        status: true,
        cancellationReason: true,
        userCancelledId: true,
        isInvoiceCancelled: true,
        created_at: true,
        updated_at: true,
        Stock: {
          select: {
            id: true,
            item: true,
            currentBalance: true,
            divergenceQuantity: true,
            invoiceQuantity: true,
            reservedQuantity: true,
            unitPrice: true,
            address: true,
            stockType: true,
            lastUpdatedBy: true,
            divergenceItem: true,
            status: true,
            invoice: true,
            company: true,
            updatedByUser: {
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
        },
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

    return result ? mapToInvoiceDto(result) : null;
  }

  async cancelledInvoice(
    id: number,
    cancelledInvoiceDto: CancelledInvoiceDto,
    userId: string,
  ) {
    await this.prisma.$transaction([
      this.prisma.stock.deleteMany({
        where: { invoiceId: id },
      }),
      this.prisma.invoice.update({
        where: { id },
        data: {
          cancellationReason: cancelledInvoiceDto.cancellationReason,
          isInvoiceCancelled: true,
          userCancelledId: userId,
        },
      }),
    ]);
  }

  async updateInvoice(id: number, data: UpdateInvoiceDto, idUser: string) {
    return await this.prisma.$transaction(async (prisma) => {
      // 🟢 Criar um objeto dinâmico apenas com os dados enviados
      const invoiceUpdateData: Record<string, any> = {};

      if (data.number !== undefined) invoiceUpdateData.number = data.number;
      if (data.series !== undefined) invoiceUpdateData.series = data.series;

      if (data.divergence !== undefined)
        invoiceUpdateData.divergence = data.divergence;
      if (data.issueDate !== undefined)
        invoiceUpdateData.issue_date = new Date(data.issueDate).toISOString();
      if (data.entryDate !== undefined)
        invoiceUpdateData.entry_date = new Date(data.entryDate).toISOString();
      if (data.totalNfValue !== undefined)
        invoiceUpdateData.totalNf_value = data.totalNfValue;
      if (data.divergenceReason !== undefined)
        invoiceUpdateData.divergenceReason = data.divergenceReason;
      if (data.companyId !== undefined)
        invoiceUpdateData.companyId = data.companyId;

      invoiceUpdateData.updated_at = new Date();
      invoiceUpdateData.userUpdateId = idUser;

      if (Object.keys(invoiceUpdateData).length > 0) {
        await prisma.invoice.update({
          where: { id: id, isInvoiceCancelled: false },
          data: invoiceUpdateData,
        });
      }

      if (data.items && data.items.length > 0) {
        for (const item of data.items) {
          const stockUpdateData: Record<string, any> = {};

          if (item.invoiceQuantity !== undefined)
            stockUpdateData.invoiceQuantity = item.invoiceQuantity;
          if (item.divergenceQuantity !== undefined) {
            stockUpdateData.divergenceQuantity = item.divergenceQuantity;
            stockUpdateData.currentBalance = item.divergenceQuantity;
          } else if (item.invoiceQuantity !== undefined) {
            stockUpdateData.currentBalance = item.invoiceQuantity;
          }
          if (item.unitPrice !== undefined)
            stockUpdateData.unitPrice = item.unitPrice;
          if (item.stockTypeId !== undefined)
            stockUpdateData.stockTypeId = item.stockTypeId;
          if (item.addressId !== undefined)
            stockUpdateData.addressId = item.addressId;

          stockUpdateData.lastUpdatedBy = idUser;

          const currentBalance =
            item.divergenceQuantity !== undefined &&
            item.divergenceQuantity !== 0
              ? item.divergenceQuantity
              : (item.invoiceQuantity ?? 0);

          await prisma.stock.upsert({
            where: {
              invoiceId_itemId: {
                invoiceId: id,
                itemId: item.itemId,
              },
            },
            update: {
              ...stockUpdateData,
              currentBalance: currentBalance,
              divergenceItem: item.divergenceItem ?? false,
              divergenceQuantity: item.divergenceQuantity ?? 0,
              invoiceQuantity: item.invoiceQuantity ?? 0,
            },
            create: {
              invoiceId: id,
              itemId: item.itemId,
              companyId: data.companyId ?? 0,
              lastUpdatedBy: idUser,
              reservedQuantity: 0,
              invoiceQuantity: item.invoiceQuantity ?? 0,
              divergenceQuantity: item.divergenceQuantity ?? 0,
              currentBalance: currentBalance,
              unitPrice: item.unitPrice ?? 0,
              stockTypeId: item.stockTypeId ?? null,
              addressId: item.addressId ?? null,
            },
          });
        }
      }

      const invoiceWithStock = await prisma.invoice.findUnique({
        where: { id },
        select: {
          id: true,
          number: true,
          series: true,
          divergence: true,
          entry_date: true,
          issue_date: true,
          totalNf_value: true,
          divergenceReason: true,
          status: true,
          cancellationReason: true,
          userCancelledId: true,
          isInvoiceCancelled: true,
          created_at: true,
          updated_at: true,
          Stock: {
            select: {
              id: true,
              item: true,
              currentBalance: true,
              divergenceQuantity: true,
              invoiceQuantity: true,
              reservedQuantity: true,
              unitPrice: true,
              address: true,
              stockType: true,
              lastUpdatedBy: true,
              divergenceItem: true,
              status: true,
              invoice: true,
              company: true,
              updatedByUser: {
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
          },
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

      return invoiceWithStock;
    });
  }

  async findByIdCancelled(id: number): Promise<InvoiceDto | null> {
    const result = await this.prisma.invoice.findUnique({
      where: { id: id, isInvoiceCancelled: true },
      select: {
        id: true,
        number: true,
        series: true,
        divergence: true,
        entry_date: true,
        issue_date: true,
        totalNf_value: true,
        divergenceReason: true,
        status: true,
        cancellationReason: true,
        userCancelledId: true,
        isInvoiceCancelled: true,
        created_at: true,
        updated_at: true,
        Stock: {
          select: {
            id: true,
            item: true,
            currentBalance: true,
            divergenceQuantity: true,
            invoiceQuantity: true,
            reservedQuantity: true,
            unitPrice: true,
            address: true,
            stockType: true,
            lastUpdatedBy: true,
            divergenceItem: true,
            status: true,
            invoice: true,
            company: true,
            updatedByUser: {
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
        },
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

    return result ? mapToInvoiceDto(result) : null;
  }

  async findAllCancelledInvoice(): Promise<InvoiceDto[]> {
    const result = await this.prisma.invoice.findMany({
      where: { isInvoiceCancelled: true },
      select: {
        id: true,
        number: true,
        series: true,
        divergence: true,
        entry_date: true,
        issue_date: true,
        totalNf_value: true,
        divergenceReason: true,
        status: true,
        cancellationReason: true,
        userCancelledId: true,
        isInvoiceCancelled: true,
        created_at: true,
        updated_at: true,
        Stock: {
          select: {
            id: true,
            item: true,
            currentBalance: true,
            divergenceQuantity: true,
            invoiceQuantity: true,
            reservedQuantity: true,
            unitPrice: true,
            address: true,
            stockType: true,
            lastUpdatedBy: true,
            divergenceItem: true,
            status: true,
            invoice: true,
            company: true,
            updatedByUser: {
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
        },
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

    return result.map(mapToInvoiceDto);
  }
  // async findByName(name: string) {
  //   const result = await this.prisma.stockType.findFirst({
  //     where: { name },
  //     select: {
  //       id: true,
  //       name: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       company: {
  //         select: {
  //           id: true,
  //           name: true,
  //           cnpj: true,
  //           isBlocked: true,
  //         },
  //       },
  //       user: {
  //         select: {
  //           id: true,
  //           first_name: true,
  //           last_name: true,
  //           email: true,
  //           username: true,
  //           role: true,
  //         },
  //       },
  //     },
  //   });

  //   return result;
  // }

  // async findAllStockType(): Promise<StockTypeDto[]> {
  //   const result = await this.prisma.stockType.findMany({
  //     select: {
  //       id: true,
  //       name: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       company: {
  //         select: {
  //           id: true,
  //           name: true,
  //           cnpj: true,
  //           isBlocked: true,
  //         },
  //       },
  //       user: {
  //         select: {
  //           id: true,
  //           first_name: true,
  //           last_name: true,
  //           email: true,
  //           username: true,
  //           role: true,
  //         },
  //       },
  //     },
  //   });

  //   return result;
  // }

  // async updateStockType(id: number, data: UpdateStockTypeDto) {
  //   return await this.prisma.stockType.update({
  //     where: { id },
  //     data,
  //     select: {
  //       id: true,
  //       name: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       company: {
  //         select: {
  //           id: true,
  //           name: true,
  //           cnpj: true,
  //           isBlocked: true,
  //         },
  //       },
  //       user: {
  //         select: {
  //           id: true,
  //           first_name: true,
  //           last_name: true,
  //           email: true,
  //           username: true,
  //           role: true,
  //         },
  //       },
  //     },
  //   });
  // }

  // async removeStockType(id: number) {
  //   return await this.prisma.stockType.delete({
  //     where: { id },
  //   });
  // }
}
