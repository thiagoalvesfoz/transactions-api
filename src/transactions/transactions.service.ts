import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [];

  create(createTransactionDto: CreateTransactionDto) {
    const transaction = new Transaction({
      ...createTransactionDto,
      id: randomUUID(),
    });

    this.transactions.push(transaction);
    return transaction;
  }

  findAll() {
    return this.transactions;
  }
}
