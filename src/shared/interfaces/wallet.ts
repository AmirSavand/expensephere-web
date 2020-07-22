import { Balance } from '@shared/interfaces/balance';

export interface Wallet {
  readonly id: number;
  readonly profile: number;
  name: string;
  color: string;
  icon: string;
  archive: boolean;
  balance: Balance;
}
