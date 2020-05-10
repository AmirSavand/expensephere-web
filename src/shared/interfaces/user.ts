import { Account } from './account';

export interface User {
  readonly id: number;
  readonly account: Account;
  readonly username: string;
  readonly email: string;
  readonly date_joined?: string;
  readonly last_login?: string;
}
