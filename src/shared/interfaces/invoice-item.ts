import { InvoiceItemMin } from './invoice-item-min';

export interface InvoiceItem extends InvoiceItemMin {
  id: string;
  order: number;
}
