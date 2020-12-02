import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  /**
   * Base API URL
   */
  static readonly BASE = environment.api;

  /**
   * List of CRUD model APIs
   */
  readonly user = new Crud<User>(this.http, 'user');
  readonly account = new Crud<Account>(this.http, 'account');
  readonly currency = new Crud<Currency>(this.http, 'currency');
  readonly profile = new Crud<Profile>(this.http, 'profile');
  readonly wallet = new Crud<Wallet>(this.http, 'wallet');
  readonly category = new Crud<Category>(this.http, 'category');
  readonly event = new Crud<Event>(this.http, 'event');
  readonly transaction = new Crud<Transaction>(this.http, 'transaction');
  readonly transactionsPage = new Crud<TransactionsPage, ApiResponse<TransactionsPage>>(
    this.http, 'transactions-page',
  );

  constructor(private http: HttpClient) {
  }
}
