import { Body, Controller, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Post('create')
  async createClient(@Body() body: CreateClientDto) {
    return await this.service.createClient(body);
  }
}
