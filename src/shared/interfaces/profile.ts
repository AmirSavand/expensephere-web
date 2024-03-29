import { Balance } from '@shared/interfaces/balance';

export interface Profile {
  readonly id: number;
  readonly user: number;
  name: string;
  note: string;
  currency: string;
  balance: Balance;
  karma: number;
  level: number;
  next_level_karma: number;
}
