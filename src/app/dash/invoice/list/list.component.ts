import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faLink, faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { ApiResponse } from '@shared/interfaces/api-response';
import { GetParams } from '@shared/interfaces/get-params';
import { Contact } from '@shared/interfaces/contact';
import { InvoiceMin } from '@shared/interfaces/invoice-min';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { FilterListValue } from '@shared/modules/filters/shared/interfaces/filter-list-value';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  readonly faEdit: IconDefinition = faPen;
  readonly faView: IconDefinition = faLink;
  readonly faYes: IconDefinition = faCheckCircle;
  readonly faNo: IconDefinition = faTimesCircle;

  readonly filters: Filter[] = [
    {
      type: FilterType.TEXT,
      label: 'Search',
      key: 'search',
      value: '',
    },
    {
      type: FilterType.LIST,
      label: 'Company',
      key: 'company',
      value: '',
    },
    {
      type: FilterType.LIST,
      label: 'Client',
      key: 'client',
      value: '',
    },
    {
      type: FilterType.LIST,
      label: 'Visibility',
      key: 'is_published',
      value: null,
      values: [
        { label: 'Published', value: String(true) },
        { label: 'Private', value: String(false) },
      ],
    },
    {
      type: FilterType.LIST,
      label: 'Payment',
      key: 'is_paid',
      value: null,
      values: [
        { label: 'Paid', value: String(true) },
        { label: 'Unpaid', value: String(false) },
      ],
    },
  ];

  invoices: InvoiceMin[];

  params: GetParams;

  ngOnInit(): void {
    Api.invoiceContact.list().subscribe({
      next: (data: ApiResponse<Contact>): void => {
        const items: FilterListValue[] = data.results.map((item: Contact): FilterListValue => ({
          value: item.id,
          label: item.name,
        }))
        this.filters[1].values = items;
        this.filters[2].values = items;
      },
    });
  }

  load(): void {
    Api.invoice.list(this.params).subscribe((data: ApiResponse<InvoiceMin>): void => {
      this.invoices = data.results;
    });
  }
}
