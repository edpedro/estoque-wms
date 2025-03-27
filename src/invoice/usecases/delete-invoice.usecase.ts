import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { InvoiceDto } from '../dto/invoice.dto';
import { CancelledInvoiceDto } from '../dto/cancelled-invoice.dto';

@Injectable()
export class DeleteInvoiceIdUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(
    id: number,
    cancelledInvoiceDto: CancelledInvoiceDto,
    userId: string,
  ) {
    const result = await this.invoiceRepository.cancelledInvoice(
      id,
      cancelledInvoiceDto,
      userId,
    );

    return result;
  }
}
