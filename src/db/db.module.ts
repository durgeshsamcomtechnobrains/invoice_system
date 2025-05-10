import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CONFIG, DB_CORE } from 'configuration';
import { UserEntity } from './models/user.entity';
import { ClientEntity } from './models/client.entity';
import { InvoiceEntity } from './models/invoice.entity';
import { DBService } from './db.service';
import { InvoiceItemEntity } from './models/invoice.item.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...(CONFIG?.db ?? {}),
      dialect: 'postgres',
      models: [UserEntity, ClientEntity, InvoiceEntity, InvoiceItemEntity],
      synchronize: true,
      logging: console.log,
      name: DB_CORE,
      autoLoadModels: true,
    }),
  ],
  exports: [DBService],
  providers: [DBService],
})
export class DBModule {}
