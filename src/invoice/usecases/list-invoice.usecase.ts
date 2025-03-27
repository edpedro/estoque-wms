import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { InvoiceDto } from '../dto/invoice.dto';

@Injectable()
export class ListInvoiceUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(): Promise<InvoiceDto[]> {
    const result = await this.invoiceRepository.findAllInvoice();

    return result;
  }
}
