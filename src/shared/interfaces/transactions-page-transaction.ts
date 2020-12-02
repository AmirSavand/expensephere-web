import { ExpenseKind } from '@shared/enums/kind';

export interface TransactionsPageTransaction {
  readonly amount: number;
  readonly note: string;
  readonly time: string;
  readonly category: {
    kind: ExpenseKind;
    name: string;
    color: string;
    icon: string;
  };
  /**
   * Extra properties
   */
  title?: string;
}
