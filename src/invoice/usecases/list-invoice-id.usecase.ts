import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { InvoiceDto } from '../dto/invoice.dto';

@Injectable()
export class ListInvoiceIdUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(id: number): Promise<InvoiceDto | null> {
    const result = await this.invoiceRepository.findById(id);

    return result;
  }
}
