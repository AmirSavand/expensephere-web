import { Balance } from '@shared/interfaces/balance';

export interface Wallet {
  id: number;
  profile: number;
  initial_balance?: number;
  name: string;
  color: string;
  icon: string;
  archive: boolean;
  balance: Balance;
}
