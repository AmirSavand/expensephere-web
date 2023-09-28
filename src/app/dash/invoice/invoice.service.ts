import { Injectable } from '@angular/core';
import { InvoiceTemplate } from '@shared/interfaces/invoice-template';

@Injectable()
export class InvoiceService {

  /**
   * All available templates for invoices go here. Make sure to
   * read and follow rules in `src/app/public/invoice/shared/components/README.md`.
   */
  readonly templates: InvoiceTemplate[] = [
    {
      name: 'Soft',
      version: '1.0',
      authors: ['Amir Savand'],
    },
    {
      name: 'Paper',
      version: '1.0',
      authors: ['Amer Ansari'],
    },
    {
      name: 'Formal',
      version: '1.0',
      authors: ['Fara Zanjani'],
    },
  ];
}
