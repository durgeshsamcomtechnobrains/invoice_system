import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(10, 10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
