import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './invoice.dto';
import { DBService } from 'src/db/db.service';
import { ClientEntity } from 'src/db/models/client.entity';
import { InvoiceEntity } from 'src/db/models/invoice.entity';
import { InvoiceItemEntity } from 'src/db/models/invoice.item.entity';

@Injectable()
export class InvoiceService {
  constructor(private readonly db: DBService) {}

  async createInvoice(body: CreateInvoiceDto) {
    const { due_date, issue_date, client_id, items } = body;
    if (!items?.length) return { message: 'Invoice can not be empty.' };
    // pending validation of due_date and issue_date
    const count = await this.db.count(ClientEntity, { id: client_id });
    if (!count) return { message: 'Client does not exist.' };
    const tr = await this.db.createTransaction();
    const each = items.every(
      (i) => i?.unit_price > 0 && i?.quantity > 0 && i?.description?.length > 3,
    );
    if (!each) return { message: 'Provide valid invoice items.' };
    try {
      // create invoices
      const invoice = await this.db.create(
        InvoiceEntity,
        {
          due_date,
          issue_date,
          client_id,
          created_by: body?.user_id,
          invoice_id: this.generateId(),
        },
        tr,
      );
      const sub = items.map((i) => ({
        invoice_id: invoice?.id,
        description: i?.description,
        unit_price: +i?.unit_price,
        quantity: +i?.quantity,
      }));
      const bulk = await this.db.bulkCreate(InvoiceItemEntity, sub, tr);
      await tr.commit();
    } catch (e) {
      console.log({ e });
      await tr.rollback();
      return 'Something went wrong';
    }
    return 'Success.';
  }

  generateId() {
    const date = new Date();
    return `INV-${date.getFullYear()}-${date.getTime()}`;
  }
}
