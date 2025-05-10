import { UUID } from 'crypto';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import sequelize from 'sequelize';
@Table({})
export class ClientEntity extends Model<ClientEntity> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: sequelize.UUIDV4,
  })
  declare id: UUID;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;
}
