import { AddressDto } from 'src/address/dto/address.dto';
import { ItemsDto } from 'src/items/dto/items.dto';
import { StockTypeDto } from 'src/stock-type/dto/stock-type.dto';

export class InvoiceItemDto {
  id: number;
  item: ItemsDto;
  currentBalance: number;
  divergenceQuantity: number;
  invoiceQuantity: number;
  reservedQuantity: number;
  unitPrice: number;
  address?: AddressDto;
  stockType?: StockTypeDto;
  lastUpdatedBy: string;
  divergenceItem: boolean;
  status: string;
  invoice: any;
  company: any;
  updatedByUser?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    role: string;
  } | null; // Permite `null`
}
export class InvoiceDto {
  id: number;
  number: string;
  series: string;
  divergence: boolean;
  issueDate: Date;
  entryDate: Date;
  totalNfValue: number;
  divergenceReason: string;
  status?: string;
  cancellationReason?: String;
  userCancelledId?: String;
  isInvoiceCancelled: boolean;
  createdAt: Date;
  updatedAt: Date;
  stock: InvoiceItemDto[];
  company: {
    id: number;
    name: string;
    cnpj: string;
    isBlocked: boolean;
  };
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    role: string;
  };
}
