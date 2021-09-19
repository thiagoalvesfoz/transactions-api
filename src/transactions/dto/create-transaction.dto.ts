import { IsNotEmpty, IsIn, Min, IsNumber } from 'class-validator';
import {
  TransactionType,
  TransactionTypeList,
} from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsIn(TransactionTypeList)
  @IsNotEmpty()
  type: TransactionType;

  @Min(0.01)
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
