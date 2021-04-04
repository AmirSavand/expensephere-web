import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Crud } from '@shared/classes/crud';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Category } from '@shared/interfaces/category';
import { Currency } from '@shared/interfaces/currency';
import { Event } from '@shared/interfaces/event';
import { Invoice } from '@shared/interfaces/invoice';
import { InvoiceItem } from '@shared/interfaces/invoice-item';
import { InvoiceMin } from '@shared/interfaces/invoice-min';
import { Profile } from '@shared/interfaces/profile';
import { Transaction } from '@shared/interfaces/transaction';
import { TransactionsPage } from '@shared/interfaces/transactions-page';
import { User } from '@shared/interfaces/user';
import { Wallet } from '@shared/interfaces/wallet';

/**
 * @todo Do not use me anymore. Use {@see Api} instead. Migrate usage and delete me.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {

  /**
   * Base API URL
   */
  static readonly BASE = environment.api;

  /**
   * List of CRUD model APIs.
   */
  readonly user = new Crud<User>('user');
  readonly account = new Crud<Account>('account');
  readonly currency = new Crud<Currency>('currency', true);
  readonly profile = new Crud<Profile>('profile');
  readonly wallet = new Crud<Wallet>('wallet');
  readonly category = new Crud<Category>('category');
  readonly event = new Crud<Event>('event');
  readonly transaction = new Crud<Transaction>('transaction');
  readonly transactionsPage = new Crud<TransactionsPage, ApiResponse<TransactionsPage>>('transactions-page');
  readonly invoice = new Crud<Invoice, ApiResponse<InvoiceMin>>('invoice');
  readonly invoiceItem = new Crud<InvoiceItem, ApiResponse<InvoiceItem>>('invoice-item');
}
