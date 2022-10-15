import { Contact } from '@shared/interfaces/contact';

export interface InvoiceMin {
  id: string;
  invoice_id: string;
  company: Contact;
  client: Contact;
  is_published: boolean;
  is_paid?: boolean;
  currency: string;
  total: number;
  items_count: number;
}
