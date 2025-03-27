import { InvoiceDto, InvoiceItemDto } from '../dto/invoice.dto';

export function mapToInvoiceDto(invoice: any): InvoiceDto {
  return {
    id: invoice.id,
    number: invoice.number,
    series: invoice.series,
    divergence: invoice.divergence ?? false,
    issueDate: new Date(invoice.issue_date),
    entryDate: new Date(invoice.entry_date),
    totalNfValue: invoice.totalNf_value,
    divergenceReason: invoice.divergenceReason,
    status: invoice.status,
    cancellationReason: invoice.cancellationReason,
    userCancelledId: invoice.cancellationReason,
    isInvoiceCancelled: invoice.isInvoiceCancelled,
    createdAt: new Date(invoice.created_at),
    updatedAt: new Date(invoice.updated_at),
    stock: Array.isArray(invoice.Stock) // Acesse o campo `Stock` (com "S" maiúsculo)
      ? invoice.Stock.map(
          (item: any): InvoiceItemDto => ({
            id: item.id,
            item: item.item, // Mapeie o objeto `item` corretamente
            currentBalance: item.currentBalance,
            invoiceQuantity: item.invoiceQuantity,
            reservedQuantity: item.reservedQuantity,
            divergenceQuantity: item.divergenceQuantity ?? 0,
            divergenceItem: item.divergenceItem,
            unitPrice: item.unitPrice,
            address: item.address || undefined, // Mapeie o objeto `address` corretamente
            stockType: item.stockType || undefined, // Mapeie o objeto `stockType` corretamente
            lastUpdatedBy: item.lastUpdatedBy,
            status: item.status || undefined,
            invoice: item.invoice, // Mapeie o objeto `invoice` corretamente
            company: item.company, // Mapeie o objeto `company` corretamente
            updatedByUser: item.updatedByUser
              ? {
                  id: item.updatedByUser.id,
                  first_name: item.updatedByUser.first_name,
                  last_name: item.updatedByUser.last_name,
                  email: item.updatedByUser.email,
                  username: item.updatedByUser.username,
                  role: item.updatedByUser.role,
                }
              : null,
          }),
        )
      : [], // Retorna um array vazio se `invoice.Stock` não for um array
    company: {
      id: invoice.company.id,
      name: invoice.company.name,
      cnpj: invoice.company.cnpj,
      isBlocked: invoice.company.isBlocked,
    },
    user: {
      id: invoice.user.id,
      first_name: invoice.user.first_name,
      last_name: invoice.user.last_name,
      email: invoice.user.email,
      username: invoice.user.username,
      role: invoice.user.role,
    },
  };
}
