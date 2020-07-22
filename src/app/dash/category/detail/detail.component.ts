import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { TransactionFormModalComponent } from '@shared/modules/transaction-form-modal/transaction-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  readonly faEdit: IconDefinition = faPen;
  readonly faBack: IconDefinition = faArrowLeft;

  readonly expenseKind = ExpenseKind;

  /**
   * Category data
   */
  category: Category;

  /**
   * Category transactions
   */
  transactions: Transaction[];

  /**
   * Category ID from param
   */
  categoryId: string;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Get category id from param
     */
    this.route.paramMap.subscribe((params: ParamMap): void => {
      if (!params.has('id')) {
        return;
      }
      /**
       * If category ID changes
       */
      if (this.categoryId !== params.get('id')) {
        /**
         * Get category ID from params
         */
        this.categoryId = params.get('id');
        /**
         * Load category data
         */
        this.api.category.retrieve(this.categoryId).subscribe((data: Category): void => {
          this.category = data;
        });
        /**
         * Load transactions of this category
         */
        this.api.transaction.list({ category: this.categoryId }).subscribe((data: Transaction[]): void => {
          this.transactions = data;
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

  // /**
  //  * Open up transaction form modal
  //  */
  // addTransaction(): void {
  //   this.modalService.show(TransactionFormModalComponent);
  // }
}
