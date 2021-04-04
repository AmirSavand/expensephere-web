import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Invoice } from '@shared/interfaces/invoice';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {

  invoice: Invoice;

  error: boolean;

  constructor(private api: ApiService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /**
     * Get and watch invoice ID from params.
     */
    this.route.params.subscribe((params: Params): void => {
      if (params.id) {
        this.api.invoice.retrieve(params.id).subscribe((data: Invoice): void => {
          this.invoice = data;
        }, (): void => {
          this.error = true;
        });
      }
    });
  }
}
