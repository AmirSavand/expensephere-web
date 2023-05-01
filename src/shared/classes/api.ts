import { environment } from '@environments/environment';
import { Crud } from '@shared/classes/crud';
import { Account } from '@shared/interfaces/account';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Category } from '@shared/interfaces/category';
import { Contact } from '@shared/interfaces/contact';
import { Currency } from '@shared/interfaces/currency';
import { Event } from '@shared/interfaces/event';
import { Invoice } from '@shared/interfaces/invoice';
import { InvoiceItem } from '@shared/interfaces/invoice-item';
import { InvoiceMin } from '@shared/interfaces/invoice-min';
import { Profile } from '@shared/interfaces/profile';
import { Tag } from '@shared/interfaces/tag';
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
  static readonly tag = new Crud<Tag>('tag');
  static readonly transaction = new Crud<Transaction, ApiResponse<Transaction>>('transaction');
  static readonly transactionsPage = new Crud<TransactionsPage, ApiResponse<TransactionsPage>>('transactions-page');
  static readonly invoice = new Crud<Invoice, ApiResponse<InvoiceMin>>('invoice');
  static readonly invoiceItem = new Crud<InvoiceItem, ApiResponse<InvoiceItem>>('invoice-item');
  static readonly invoiceContact = new Crud<Contact, ApiResponse<Contact>>('invoice-contact');
}
