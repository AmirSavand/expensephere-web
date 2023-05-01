export interface Event {
  readonly id: number;
  readonly profile: number;
  readonly transactions_count: number;
  readonly transactions_total: number;
  name: string;
  used: number;
  budget: number;
  color: string;
  icon: string;
  start?: string;
  end?: string;
  created: string;
  note?: string;
  archive: boolean;
}
