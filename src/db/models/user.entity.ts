import { UUID } from 'crypto';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import sequelize from 'sequelize';

export const USER_ROLE = {
  ADMIN: 1,
  ACCOUNTANT: 2,
  VIEWER: 3,
};

@Table({})
export class UserEntity extends Model<UserEntity> {
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

  @Column({
    type: DataType.SMALLINT,
    allowNull: false,
  })
  role: number; // USER_ROLE

  @Column({ type: DataType.STRING, allowNull: false })
  jwt: string;
}
