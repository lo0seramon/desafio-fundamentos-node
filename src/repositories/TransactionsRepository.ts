import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acumulator, currentValue) => {
        return acumulator + currentValue.value;
      }, 0);

    const outcomeTransactions = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acumulator, currentValue) => {
        return acumulator + currentValue.value;
      }, 0);

    const balance: Balance = {
      income: incomeTransactions,
      outcome: outcomeTransactions,
      total: incomeTransactions - outcomeTransactions,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
