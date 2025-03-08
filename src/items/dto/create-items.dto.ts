import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty({ message: "O campo 'codigo' não pode estar vazio." })
  readonly code: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'descrição' não pode estar vazio." })
  readonly description: string;

  @IsNumber({}, { message: "O campo 'categoryId' deve ser um número válido." })
  @IsNotEmpty({ message: "O campo 'categoryId' não pode estar vazio." })
  readonly categoryId: number;

  @IsNumber({}, { message: "O campo 'companyId' deve ser um número válido." })
  @IsNotEmpty({ message: "O campo 'companyId' não pode estar vazio." })
  readonly companyId: number;

  @IsNumber()
  @IsOptional()
  readonly weight?: number;

  @IsBoolean()
  @IsOptional()
  readonly isBlocked?: boolean;
}
