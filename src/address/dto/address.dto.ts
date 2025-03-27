export class AddressDto {
  id: number;
  name: string;
  isBlocked: boolean;
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
