import { IsString, IsNotEmpty } from 'class-validator';

export class CancelledInvoiceDto {
  @IsString()
  @IsNotEmpty({ message: "O campo 'cancellationReason' não pode estar vazio." })
  readonly cancellationReason: string;
}
