export interface Tag {
  readonly id: number;
  readonly profile: number;
  readonly transactions_count: number;
  readonly transactions_total: number;
  name: string;
  color: string;
  icon: string;
  note?: string;
  archive: boolean;
  readonly created: string;
}
