import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons/faMoneyBillAlt';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons/faStickyNote';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faCube } from '@fortawesome/free-solid-svg-icons/faCube';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { Wallet } from '@shared/interfaces/wallet';
import { ApiService } from '@shared/services/api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-transaction-form-modal',
  templateUrl: './transaction-form-modal.component.html',
  styleUrls: ['./transaction-form-modal.component.scss'],
})
export class TransactionFormModalComponent implements OnInit {

  readonly expenseKind = ExpenseKind;

  readonly faClose: IconDefinition = faTimes;
  readonly faWallet: IconDefinition = faWallet;
  readonly faCategory: IconDefinition = faCube;
  readonly faAmount: IconDefinition = faMoneyBillAlt;
  readonly faTime: IconDefinition = faClock;
  readonly faNote: IconDefinition = faStickyNote;
  readonly faEvent: IconDefinition = faCalendar;
  readonly faCollapse: IconDefinition = faChevronDown;

  expenseKindSelected: ExpenseKind = this.expenseKind.EXPENSE;

  wallets: Wallet[];
  events: Event[];
  categories: Category[];
  categoryGroups: Record<ExpenseKind, Category[]> = {
    [ExpenseKind.INCOME]: [],
    [ExpenseKind.EXPENSE]: [],
    [ExpenseKind.TRANSFER]: [],
  };

  form: ReactiveFormData = {
    error: {},
  };

  showExtraDetails = false;

  constructor(public modal: BsModalRef,
              private formBuilder: FormBuilder,
              private api: ApiService) {
  }

  ngOnInit(): void {
    /**
     * Load wallets
     */
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      this.wallets = data;
      // Select first wallet
      this.form.form.get('wallet').setValue(data[0].id);
    });
    /**
     * Load categories
     */
    this.api.category.list().subscribe((data: Category[]): void => {
      this.categories = data;
      // Group categories
      for (const category of this.categories) {
        this.categoryGroups[category.kind].push(category);
      }
    });
    /**
     * Load events
     */
    this.api.event.list().subscribe((data: Event[]): void => {
      this.events = data;
    });
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      wallet: [null, Validators.required],
      category: [null, Validators.required],
      into: [null],
      event: [null],
      amount: [null, Validators.compose([Validators.required, Validators.min(0)])],
      time: [new Date().toISOString().slice(0, 16), Validators.required],
      note: [''],
    });
  }

  submit(): void {
    this.form.loading = true;
    this.api.transaction.create(this.form.form.value).subscribe((): void => {
      this.modal.hide();
    }, (error: HttpErrorResponse): void => {
      this.form.loading = false;
      this.form.error = error.error;
    });
  }

  /**
   * Change expense kind (income, expense, etc)
   */
  setExpenseKind(expenseKind: ExpenseKind): void {
    this.expenseKindSelected = expenseKind;
    /**
     * Set category to transfer if it's a transfer so we can hide the category field
     */
    if (expenseKind === ExpenseKind.TRANSFER) {
      this.form.form.get('category').setValue(this.categoryGroups[ExpenseKind.TRANSFER][0].id);
    }
  }
}
