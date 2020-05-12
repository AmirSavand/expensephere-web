import { ExpenseKind } from '@shared/enums/kind';

export interface Transaction {
  readonly id: number;
  readonly kind: ExpenseKind;
  wallet: number;
  category: number;
  event?: number;
  into?: number;
  amount: number;
  note: string;
  created: string;
}
