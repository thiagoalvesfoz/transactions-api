import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transactions/entities/transaction.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: __dirname + '/database/database.sqlite',
      models: [Transaction],
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
      },
    }),
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
