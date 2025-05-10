import { UUID } from 'crypto';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { InvoiceEntity } from './invoice.entity';

@Table({})
export class InvoiceItemEntity extends Model<InvoiceItemEntity> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => InvoiceEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  invoice_id: UUID;

  @BelongsTo(() => InvoiceEntity)
  invoice_data: any;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  unit_price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}

// Trigger code

// CREATE TRIGGER INSERT_INVC_ITEM AFTER INSERT ON public."InvoiceItemEntities" FOR EACH ROW EXECUTE FUNCTION  update_total()

// CREATE FUNCTION update_total() RETURNS trigger AS $update_total$ BEGIN UPDATE public."InvoiceEntities" SET total=(SELECT SUM(unit_price * quantity) FROM public."InvoiceItemEntities" WHERE invoice_id=new."invoice_id") WHERE id=NEW."invoice_id"; RETURN NULL; END; $update_total$ LANGUAGE plpgsql;
