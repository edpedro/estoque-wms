import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { InvoiceService } from '../service/invoice.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { CancelledInvoiceDto } from '../dto/cancelled-invoice.dto';

@Controller('invoice')
@UseGuards(AuthGuard('jwt'))
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @Roles('invoice_create')
  create(@Body() createInvoiceDto: CreateInvoiceDto, @Req() req: ReqUserDto) {
    return this.invoiceService.create(createInvoiceDto, req);
  }

  @Get()
  @Roles('invoice_read')
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  @Roles('invoice_read')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Get('/cancelled/all')
  @Roles('invoice_read_cancelled')
  findAllCancelled() {
    return this.invoiceService.findAllCancelled();
  }

  @Get('/cancelled/:id')
  @Roles('invoice_read_cancelled')
  findOneCancelled(@Param('id') id: string) {
    return this.invoiceService.findOneCancelled(+id);
  }

  @Patch(':id')
  @Roles('invoice_update')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @Req() req: ReqUserDto,
  ) {
    return this.invoiceService.update(+id, updateInvoiceDto, req);
  }

  @Delete(':id')
  @Roles('invoice_delete')
  remove(
    @Param('id') id: string,
    @Body() cancelledInvoiceDto: CancelledInvoiceDto,
    @Req() req: ReqUserDto,
  ) {
    return this.invoiceService.removeCancelledInvoice(
      +id,
      cancelledInvoiceDto,
      req,
    );
  }
}
