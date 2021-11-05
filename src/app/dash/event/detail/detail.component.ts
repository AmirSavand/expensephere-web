import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Api } from '@shared/classes/api';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { GetParams } from '@shared/types/get-params';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  // Filters used for loading transactions.
  readonly transactionsFilter: GetParams = {};

  // Event ID from param.
  eventId: string;

  // Event data.
  event: Event;

  // Wallet list.
  wallets: Wallet[];

  // Category list.
  categories: Category[];

  // event transactions.
  transactions: Transaction[];

  // Page error flag.
  error = false;

  // API response data for transactions.
  transactionsApiResponse: ApiResponse<Transaction>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /**
     * Watch for modal changes.
     */
    EventFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
    /**
     * Get event id from param
     */
    this.route.paramMap.subscribe((params: ParamMap): void => {
      if (!params.has('id')) {
        return;
      }
      /**
       * If event ID changes
       */
      if (this.eventId !== params.get('id')) {
        // Get event ID from params.
        this.eventId = params.get('id');
        // Update transaction filters.
        this.transactionsFilter.event = this.eventId;
        // Load event data.
        this.load();
        /**
         * Load wallet list
         */
        Api.wallet.list().subscribe((data: Wallet[]): void => {
          this.wallets = data;
        });
        /**
         * Load category list
         */
        Api.category.list().subscribe((data: Category[]): void => {
          this.categories = data;
        });
        this.loadTransactions();
      }
    });
  }

  /**
   * Load event data
   */
  load(): void {
    Api.event.retrieve(this.eventId).subscribe((data: Event): void => {
      this.event = data;
    }, (): void => {
      delete this.event;
      this.error = true;
    });
  }

  /**
   * Load transactions of this category.
   */
  loadTransactions(): void {
    Api.transaction.list(this.transactionsFilter).subscribe((data: ApiResponse<Transaction>): void => {
      this.transactions = data.results;
      this.transactionsApiResponse = data;
    });
  }
}
