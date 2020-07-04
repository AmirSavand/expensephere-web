import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
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
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { ApiService } from '@shared/services/api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-form-modal',
  templateUrl: './transaction-form-modal.component.html',
  styleUrls: ['./transaction-form-modal.component.scss'],
  providers: [DatePipe],
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

  @Input() transaction?: Transaction;

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

  /**
   * If {@see transaction} is given, then the modal is for edit
   */
  isEditing: boolean;

  constructor(public modal: BsModalRef,
              private formBuilder: FormBuilder,
              private api: ApiService,
              private date: DatePipe) {
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
      // For editing, update selected kind
      if (this.isEditing) {
        this.setExpenseKind(this.transaction.kind);
        this.form.form.get('category').patchValue(this.transaction.category);
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
      time: [this.date.transform(new Date(), 'yyyy-MM-ddThh:mm'), Validators.required],
      note: [''],
    });
    /**
     * Check if editing
     */
    if (this.transaction) {
      this.isEditing = true;
      this.form.form.patchValue(Object.assign(this.transaction, {
        time: this.date.transform(this.transaction.time, 'yyyy-MM-ddThh:mm'),
      }));
    }
  }

  /**
   * Submit the form
   */
  submit(): void {
    this.form.loading = true;
    const payload: Partial<Transaction> = Object.assign(this.form.form.value, {
      time: new Date(this.form.form.value.time).toISOString(),
    });
    let method: Observable<Transaction> = this.api.transaction.create(payload);
    if (this.isEditing) {
      method = this.api.transaction.update(this.transaction.id, payload);
    }
    method.subscribe((data: Transaction): void => {
      if (this.isEditing) {
        Object.assign(this.transaction, data);
      }
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
     * Otherwise clear it
     */
    if (expenseKind === ExpenseKind.TRANSFER) {
      this.form.form.get('category').setValue(this.categoryGroups[ExpenseKind.TRANSFER][0].id);
    } else {
      this.form.form.get('category').reset();
    }
  }
}
