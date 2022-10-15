import { InvoiceItemMin } from './invoice-item-min';
import { InvoiceMin } from './invoice-min';

export interface Invoice extends InvoiceMin {
  template?: string;
  date?: string;
  due_date?: string;
  items_label?: string;
  note: string;
  discount_flat: boolean;
  discount?: number;
  tax?: number;
  subtotal: number;
  items: InvoiceItemMin[];
  created: string;
  updated: string;
}
