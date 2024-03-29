import { ExpenseKind } from '@shared/enums/kind';

export interface Transaction {
  readonly id: number;
  wallet: number;
  category: number;
  kind: ExpenseKind;
  tags: number[];
  event?: number;
  into?: number;
  amount: number;
  note: string;
  time: string;
  created: string;
  updated: string;
  archive: boolean;
  exclude: boolean;
  /**
   * Extra properties
   */
  title?: string;
}
