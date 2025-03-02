export class CompanyDto {
  id: number;
  name: string;
  cnpj: string;
  isBlocked: boolean;
  create_id: string;
  created_at: Date | null;
  updated_at: Date | null;
}
