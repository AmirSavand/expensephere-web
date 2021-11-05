export interface InvoiceMin {
  id: string;
  invoice_id: string;
  client?: string;
  is_published: boolean;
  is_paid?: boolean;
  currency: string;
  total: number;
  items_count: number;
}
