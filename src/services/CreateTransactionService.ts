import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO

    if (!type.includes('income') && !type.includes('outcome')) {
      throw Error('Type transaction incorrect');
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (balance.total < value) {
        throw new Error('You have no balance');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
