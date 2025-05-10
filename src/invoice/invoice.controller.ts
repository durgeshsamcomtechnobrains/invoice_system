import { Body, Controller, Post } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}

  @Post('/create')
  async createInvoice(@Body() body: CreateInvoiceDto) {
    return await this.service.createInvoice(body);
  }
}
