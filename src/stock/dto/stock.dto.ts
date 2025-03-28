export class StockDto {
  id: number;
  item: {
    id: number;
    code: string;
    description: string;
    created_at: Date | null;
    updated_at: Date | null;
    category: {
      id: number;
      name: string;
      createId: string;
      created_at: Date | null;
      updated_at: Date | null;
    } | null;
  };
  address?: {
    id: number;
    name: string;
    created_at: Date | null;
    updated_at: Date | null;
  } | null;
  stockType?: {
    id: number;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  } | null;
  unitPrice: number;
  invoiceQuantity: number;
  reservedQuantity: number;
  currentBalance: number;
}
