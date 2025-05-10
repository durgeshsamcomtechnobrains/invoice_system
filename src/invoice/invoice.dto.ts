import { IsArray, IsDateString, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsUUID()
  client_id: UUID;

  @IsNotEmpty()
  @IsDateString()
  due_date: Date;

  @IsNotEmpty()
  @IsDateString()
  issue_date: Date;

  @IsNotEmpty()
  @IsArray()
  items: any[];

  @IsNotEmpty()
  @IsUUID()
  user_id: UUID;
}
