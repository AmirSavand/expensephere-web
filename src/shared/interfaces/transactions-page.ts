import { Balance } from './balance';
import { TransactionsPageTransaction } from './transactions-page-transaction';

export interface TransactionsPage {
  readonly id: string;
  readonly profile?: number;
  user: {
    name: string;
  };
  note: string;
  created: string;
  transactions: (number | TransactionsPageTransaction)[];
  currency: string;
  balance: Balance;
}
