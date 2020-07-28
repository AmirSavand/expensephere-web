import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  readonly faEdit: IconDefinition = faPen;

  /**
   * Transaction data
   */
  transaction: Transaction;

  /**
   * Category list
   */
  categories: Category[];

  /**
   * Wallet list
   */
  wallets: Wallet[];

  /**
   * Event list
   */
  events: Event[];

  /**
   * Transaction ID from param
   */
  transactionId: string;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Get transaction id from param
     */
    this.route.paramMap.subscribe((params: ParamMap): void => {
      if (!params.has('id')) {
        return;
      }
      /**
       * If transaction ID changes
       */
      if (this.transactionId !== params.get('id')) {
        /**
         * Get transaction ID from params
         */
        this.transactionId = params.get('id');
        /**
         * Load transaction data
         */
        this.api.transaction.retrieve(this.transactionId).subscribe((data: Transaction): void => {
          this.transaction = data;
        });
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
         * Load event list
         */
        this.api.event.list().subscribe((data: Event[]): void => {
          this.events = data;
        });
      }
    });
  }

  /**
   * Open transaction form modal for editing
   */
  editTransaction(transaction: Transaction): void {
    this.modalService.show(TransactionFormModalComponent, { initialState: { transaction } });
  }
}
