import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { InvoiceDto } from '../dto/invoice.dto';

@Injectable()
export class ListInvoiceNumberUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(number: string): Promise<InvoiceDto | null> {
    const result = await this.invoiceRepository.findByNumber(number);

    return result;
  }
}
