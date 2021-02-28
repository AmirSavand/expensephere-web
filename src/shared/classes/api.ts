import { environment } from '@environments/environment';
import { Crud } from '@shared/classes/crud';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Category } from '@shared/interfaces/category';
import { Currency } from '@shared/interfaces/currency';
import { Event } from '@shared/interfaces/event';
import { Profile } from '@shared/interfaces/profile';
import { Transaction } from '@shared/interfaces/transaction';
import { TransactionsPage } from '@shared/interfaces/transactions-page';
import { User } from '@shared/interfaces/user';
import { Wallet } from '@shared/interfaces/wallet';

export class Api {

  static readonly base = environment.api;

  static readonly user = new Crud<User>('user');
  static readonly account = new Crud<Account>('account');
  static readonly currency = new Crud<Currency>('currency');
  static readonly profile = new Crud<Profile>('profile');
  static readonly wallet = new Crud<Wallet>('wallet');
  static readonly category = new Crud<Category>('category');
  static readonly event = new Crud<Event>('event');
  static readonly transaction = new Crud<Transaction>('transaction');
  static readonly transactionsPage = new Crud<TransactionsPage, ApiResponse<TransactionsPage>>('transactions-page');
}
