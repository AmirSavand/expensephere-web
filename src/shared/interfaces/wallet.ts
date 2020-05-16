import { Balance } from '@shared/interfaces/balance';
import { Icon } from '@shared/types/icon';

export interface Wallet {
  readonly id: number;
  readonly profile: number;
  name: string;
  color: string;
  icon: Icon;
  archive: boolean;
  balance: Balance;
}
