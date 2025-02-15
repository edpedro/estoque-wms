export class ItemsDto {
  id: number;
  code: string;
  description: string;
  category: string | null;
  companyId: number | null;
  create_id: string;
  weight: number;
  isBlocked: boolean;
  created_at: Date | null;
  updated_at: Date | null;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
  };
}
