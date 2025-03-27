import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsDateString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class InvoiceItemDto {
  @IsNumber({}, { message: "O campo 'itemId' deve ser um número válido." })
  @IsNotEmpty({ message: "O campo 'itemId' não pode estar vazio." })
  readonly itemId: number;

  @IsNumber(
    {},
    { message: "O campo 'invoiceQuantity' deve ser um número válido." },
  )
  @IsNotEmpty({ message: "O campo 'invoiceQuantity' não pode estar vazio." })
  readonly invoiceQuantity: number;

  @IsNumber({}, { message: "O campo 'unitPrice' deve ser um número válido." })
  @IsNotEmpty({ message: "O campo 'unitPrice' não pode estar vazio." })
  readonly unitPrice: number;

  @IsNumber({}, { message: "O campo 'addressId' deve ser um número válido." })
  @IsOptional()
  readonly addressId?: number;

  @IsNumber({}, { message: "O campo 'stockTypeId' deve ser um número válido." })
  @IsNotEmpty({ message: "O campo 'stockTypeId' não pode estar vazio." })
  readonly stockTypeId?: number;

  @IsNumber(
    {},
    { message: "O campo 'divergenceQuantity' deve ser um número válido." },
  )
  @IsOptional()
  readonly divergenceQuantity?: number;

  @IsNotEmpty({ message: "O campo 'divergenceItem' não pode estar vazio." })
  readonly divergenceItem: boolean;
}

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty({ message: "O campo 'number' não pode estar vazio." })
  readonly number: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'series' não pode estar vazio." })
  readonly series: string;

  @IsBoolean()
  @IsOptional()
  readonly divergence?: boolean;

  @IsDateString(
    {},
    { message: "O campo 'issueDate' deve ser uma data válida." },
  )
  readonly issueDate: string;

  @IsDateString(
    {},
    { message: "O campo 'entryDate' deve ser uma data válida." },
  )
  readonly entryDate: string;

  @IsNumber(
    {},
    { message: "O campo 'totalNfValue' deve ser um número válido." },
  )
  @IsNotEmpty({ message: "O campo 'totalNfValue' não pode estar vazio." })
  readonly totalNfValue: number;

  @IsString()
  @IsOptional()
  readonly divergenceReason?: string;

  @IsString()
  @IsOptional()
  readonly status?: string;

  @IsNumber({}, { message: "O campo 'companyId' deve ser um número válido." })
  @IsNotEmpty({ message: "O campo 'companyId' não pode estar vazio." })
  readonly companyId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  readonly items: InvoiceItemDto[];
}
