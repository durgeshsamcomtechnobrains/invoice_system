import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBModule } from './db/db.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { CONFIG, DB_CORE } from 'configuration';
import { UserEntity } from './db/models/user.entity';
import { ClientEntity } from './db/models/client.entity';
import { InvoiceEntity } from './db/models/invoice.entity';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceService } from './invoice/invoice.service';
import { RoleMiddleware } from './role.middleware';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ClientController } from './client/client.controller';
import { ClientService } from './client/client.service';

@Module({
  imports: [DBModule],
  controllers: [
    AppController,
    InvoiceController,
    UserController,
    ClientController,
  ],
  providers: [AppService, InvoiceService, UserService, ClientService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleMiddleware)
      .exclude('/user/login')
      .forRoutes(InvoiceController, UserController, ClientController);
  }
}
