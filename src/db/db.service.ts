import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { DB_CORE } from 'configuration';
import {
  FindOptions,
  Sequelize,
  Transaction,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';

@Injectable()
export class DBService {
  constructor(
    @InjectConnection(DB_CORE)
    private readonly seql: Sequelize,
  ) {}

  async create(model: any, data, tr?: Transaction) {
    const repo = this.seql.model(model);
    const created = await repo.create(data, { transaction: tr });
    return created['dataValues'];
  }

  async bulkCreate(model: any, data, tr?: Transaction) {
    const repo = this.seql.model(model);
    const created = await repo.bulkCreate(data, { transaction: tr });
    return created.map((cr) => cr['dataValues']);
  }

  async count(model: any, where: WhereOptions) {
    const repo = this.seql.model(model);
    return await repo.count({ where });
  }

  async findOne(model: any, findOpt: FindOptions) {
    const repo = this.seql.model(model);
    const row = await repo.findOne(findOpt);
    return row?.['dataValues'];
  }

  async update(model: any, data, opt: UpdateOptions) {
    const repo = this.seql.model(model);
    return await repo.update(data, opt);
  }

  async createTransaction() {
    return await this.seql.transaction();
  }
}
