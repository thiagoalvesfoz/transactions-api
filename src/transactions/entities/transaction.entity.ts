export enum TransactionType {
  CREDIT = 'credit',
  DEBIT = 'debit',
}

export class Transaction {
  id: string;
  type: TransactionType;
  amount: number;

  constructor(transaction: any) {
    this.id = transaction.id;
    this.type = transaction.type;
    this.amount = transaction.amount;
  }
}
