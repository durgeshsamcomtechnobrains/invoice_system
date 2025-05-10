import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsIn,
  MinLength,
} from 'class-validator';
import { USER_ROLE } from 'src/db/models/user.entity';

export class CreatUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(Object.values(USER_ROLE))
  role: number;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
