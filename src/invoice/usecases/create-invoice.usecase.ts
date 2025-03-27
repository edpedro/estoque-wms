import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { InvoiceDto } from '../dto/invoice.dto';
import { mapToInvoiceDto } from '../utils/mapToinvoiceDto';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(data: CreateInvoiceDto, idUser: string): Promise<InvoiceDto> {
    const result = await this.invoiceRepository.createInvoice(data, idUser);

    return mapToInvoiceDto(result);
  }
}
