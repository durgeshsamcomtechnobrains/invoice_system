import { UUID } from 'crypto';
import sequelize from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';
import { ClientEntity } from './client.entity';

export const INVOICE_STATUS = {
  DRAFT: 0,
  SENT: 1,
  PAID: 2,
  OVERDUE: 3,
};

@Table({})
export class InvoiceEntity extends Model<InvoiceEntity> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: sequelize.UUIDV4,
  })
  declare id: UUID;

  @Column({ type: DataType.STRING, allowNull: false })
  invoice_id: string;

  @ForeignKey(() => ClientEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  client_id: number;

  @BelongsTo(() => ClientEntity)
  clientData: any;

  @Column({ type: DataType.DOUBLE, allowNull: false, defaultValue: 0 })
  total: number;

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
    defaultValue: INVOICE_STATUS.DRAFT,
  })
  status: number; // INVOICE_STATUS

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
    defaultValue: 0,
  })
  is_deleted: number; // 1 for deleted

  @Column({ type: DataType.DATE, allowNull: false })
  due_date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  issue_date: Date;

  @ForeignKey(() => UserEntity)
  @Column({ type: DataType.UUID, allowNull: false })
  created_by: number;

  @BelongsTo(() => UserEntity)
  created_by_data: UserEntity;
}
