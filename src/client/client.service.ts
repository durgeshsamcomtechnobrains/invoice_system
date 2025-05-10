import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './client.dto';
import { DBService } from 'src/db/db.service';
import { ClientEntity } from 'src/db/models/client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly db: DBService) {}

  async createClient(body: CreateClientDto) {
    const { email, address, phone, name } = body;
    const count = await this.db.count(ClientEntity, { email });
    if (count) return { message: 'Client already exist.' };
    const client = await this.db.create(ClientEntity, {
      email,
      address,
      phone,
      name,
    });
    return client;
  }
}
