import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStockTypeDto {
  @IsString()
  @IsNotEmpty({ message: "O campo 'name' não pode estar vazio." })
  readonly name: string;

  @IsNumber({}, { message: "O campo 'companyId' deve ser um número válido." })
  @IsNotEmpty({ message: "O campo 'companyId' não pode estar vazio." })
  readonly companyId: number;
}
