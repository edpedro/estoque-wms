export class UserAuthDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  username: string;
  role: string;
  isBlocked: boolean;
  login_attempts: number;
  enterpriseId: number | null;
  active: boolean;
  permissions: { id: number; name: string; description: string | null }[];
  companies: { id: number; name: string; cnpj: string }[];
  created_at: Date | null;
  updated_at: Date | null;
  lastLogin: Date | null;
}
