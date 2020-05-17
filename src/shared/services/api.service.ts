import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Crud } from '@shared/classes/crud';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { Profile } from '@shared/interfaces/profile';
import { Transaction } from '@shared/interfaces/transaction';
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
  readonly profile = new Crud<Profile>(this.http, 'profile');
  readonly wallet = new Crud<Wallet>(this.http, 'wallet', true);
  readonly category = new Crud<Category>(this.http, 'category', true);
  readonly event = new Crud<Event>(this.http, 'event', true);
  readonly transaction = new Crud<Transaction>(this.http, 'transaction', true);

  constructor(private http: HttpClient) {
  }
}
