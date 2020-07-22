import { ExpenseKind } from '@shared/enums/kind';

export interface Category {
  readonly id: number;
  readonly profile: number;
  kind: ExpenseKind;
  name: string;
  color: string;
  icon: string;
  archive: boolean;
  transactions_count: number;
  transactions_total: number;
}
