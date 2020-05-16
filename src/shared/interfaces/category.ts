import { ExpenseKind } from '@shared/enums/kind';
import { Icon } from '@shared/types/icon';

export interface Category {
  readonly id: number;
  readonly profile: number;
  kind: ExpenseKind;
  name: string;
  color: string;
  icon: Icon;
  archive: boolean;
  transactions_count: number;
  transactions_total: number;
}
