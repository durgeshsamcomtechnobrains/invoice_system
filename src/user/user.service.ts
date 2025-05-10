import { Injectable } from '@nestjs/common';
import { CreatUserDto, LoginDto } from './user.dto';
import { DBService } from 'src/db/db.service';
import { UserEntity } from 'src/db/models/user.entity';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from 'configuration';

@Injectable()
export class UserService {
  constructor(private readonly db: DBService) {}

  async createUser(body: CreatUserDto) {
    const { name, email, role } = body;
    // check if already exists same email
    const count = await this.db.count(UserEntity, { email });
    if (count) return { message: 'Email already exist.' };
    const create = await this.db.create(UserEntity, { name, email, role });
    return create;
  }

  async login(body: LoginDto) {
    const { email } = body;
    const found = await this.db.findOne(UserEntity, {
      where: { email },
      attributes: ['id', 'role'],
    });
    if (!found) return { message: 'User not found.' };
    const jwtPayload = JSON.stringify(found);
    const token = sign(jwtPayload, JWT_SECRET);
    await this.db.update(
      UserEntity,
      { jwt: token },
      { where: { id: found.id } },
    );
    return { token };
  }
}
