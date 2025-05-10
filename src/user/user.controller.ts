import { Body, Controller, Post } from '@nestjs/common';
import { CreatUserDto, LoginDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/create')
  async createUser(@Body() body: CreatUserDto) {
    return await this.service.createUser(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.service.login(body);
  }
}
