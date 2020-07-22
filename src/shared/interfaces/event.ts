export interface Event {
  readonly id: number;
  readonly profile: number;
  name: string;
  budget: number;
  color: string;
  icon: string;
  start: string;
  end: string;
  created: string;
  note?: string;
  archive: boolean;
  transactions_count: number;
}
