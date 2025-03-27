import { Injectable } from '@nestjs/common';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { InvoiceDto } from '../dto/invoice.dto';
import { mapToInvoiceDto } from '../utils/mapToinvoiceDto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';

@Injectable()
export class UpdateInvoiceUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  async execute(
    id: number,
    data: UpdateInvoiceDto,
    idUser: string,
  ): Promise<InvoiceDto> {
    const result = await this.invoiceRepository.updateInvoice(id, data, idUser);

    return mapToInvoiceDto(result);
  }
}
