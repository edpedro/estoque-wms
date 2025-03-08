export class CategoryDto {
  id: number;
  name: string;
  create_id: string;
  created_at: Date | null;
  updated_at: Date | null;
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
