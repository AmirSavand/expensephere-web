import { Color } from '@shared/classes/color';
import { Icon } from '@shared/types/icon';

export interface Event {
  readonly id: number;
  readonly profile: number;
  name: string;
  budget: number;
  color: Color;
  icon: Icon;
  start: string;
  end: string;
  created: string;
  note?: string;
  archive: boolean;
  transactions_count: number;
}
