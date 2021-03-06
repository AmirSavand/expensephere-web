import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { ApiService } from '@shared/services/api.service';
import { EventFormModalComponent } from 'src/shared/modules/event-form-modal/event-form-modal.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  /**
   * Event ID from param
   */
  eventId: string;

  /**
   * Event data
   */
  event: Event;

  /**
   * Wallet list
   */
  wallets: Wallet[];

  /**
   * Category list
   */
  categories: Category[];

  /**
   * event transactions
   */
  transactions: Transaction[];

  /**
   * Page error
   */
  error = false;

  constructor(private api: ApiService,
              private route: ActivatedRoute) {
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
        /**
         * Get event ID from params
         */
        this.eventId = params.get('id');
        /**
         * Load event data
         */
        this.load();
        /**
         * Load wallet list
         */
        this.api.wallet.list().subscribe((data: Wallet[]): void => {
          this.wallets = data;
        });
        /**
         * Load category list
         */
        this.api.category.list().subscribe((data: Category[]): void => {
          this.categories = data;
        });
        /**
         * Load transactions
         */
        this.api.transaction.list({ event: this.eventId }).subscribe((data: Transaction[]): void => {
          this.transactions = data;
        });
      }
    });
  }

  /**
   * Load event data
   */
  load(): void {
    this.api.event.retrieve(this.eventId).subscribe((data: Event): void => {
      this.event = data;
    }, (): void => {
      delete this.event;
      this.error = true;
    });
  }
}
