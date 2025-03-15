export class StockTypeDto {
  id: number;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    role: string;
  };
}
