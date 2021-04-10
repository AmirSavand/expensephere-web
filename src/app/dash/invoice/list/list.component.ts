import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import { ApiResponse } from '@shared/interfaces/api-response';
import { GetParams } from '@shared/interfaces/get-params';
import { InvoiceMin } from '@shared/interfaces/invoice-min';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { Api } from 'src/shared/classes/api';

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

  // Params to filter data.
  params: GetParams;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    Api.invoice.list(this.params).subscribe((data: ApiResponse<InvoiceMin>): void => {
      this.invoices = data.results;
    });
  }
}
