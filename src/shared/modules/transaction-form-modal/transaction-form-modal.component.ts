import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons/faMoneyBillAlt';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons/faStickyNote';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faCube } from '@fortawesome/free-solid-svg-icons/faCube';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { Utils } from '@shared/classes/utils';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { Event } from '@shared/interfaces/event';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { WalletFormModalComponent } from '@shared/modules/wallet-form-modal/wallet-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { InlineStorage } from 'src/shared/classes/inline-storage';
import { EventFormModalComponent } from 'src/shared/modules/event-form-modal/event-form-modal.component';

@Component({
  selector: 'app-transaction-form-modal',
  templateUrl: './transaction-form-modal.component.html',
  styleUrls: ['./transaction-form-modal.component.scss'],
  providers: [DatePipe],
})
export class TransactionFormModalComponent implements OnInit {

  /**
   * Triggered when data is deleted, updated or created.
   */
  static readonly CHANGE: EventEmitter<void> = new EventEmitter();

  readonly expenseKind = ExpenseKind;

  readonly faClose: IconDefinition = faTimes;
  readonly faWallet: IconDefinition = faWallet;
  readonly faCategory: IconDefinition = faCube;
  readonly faAmount: IconDefinition = faMoneyBillAlt;
  readonly faTime: IconDefinition = faClock;
  readonly faNote: IconDefinition = faStickyNote;
  readonly faEvent: IconDefinition = faCalendar;
  readonly faCollapse: IconDefinition = faChevronDown;
  readonly faTrash: IconDefinition = faTrash;

  readonly walletInlineStorage = new InlineStorage('last-wallet');

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

  /**
   * Current (profile) currency
   */
  currency: string;

  /**
   * No wallet, used to show alert to add wallet
   */
  noWallets = false;

  constructor(public modal: BsModalRef,
              private modalService: BsModalService,
              private profileService: ProfileService,
              private formBuilder: FormBuilder,
              private api: ApiService,
              private date: DatePipe,
              private router: Router) {
  }

  ngOnInit(): void {
    /**
     * Set currency
     */
    this.currency = ProfileService.profile.value.currency;
    /**
     * Load wallets
     */
    this.api.wallet.list().subscribe((data: Wallet[]): void => {
      this.wallets = data;
      // Select first wallet
      if (data.length && !this.isEditing) {
        this.form.form.get('wallet').setValue(Number(this.walletInlineStorage.getValue(String(data[0].id))));
      } else if (!data.length) {
        this.noWallets = true;
      }
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
      time: [this.date.transform(new Date(), Utils.HTML_DATETIME_FORMAT), Validators.required],
      archive: [false],
      exclude: [false],
      note: [''],
    });
    /**
     * Check if editing
     */
    if (this.transaction) {
      this.isEditing = true;
      this.form.form.patchValue(Object.assign(this.transaction, {
        time: this.date.transform(this.transaction.time, Utils.HTML_DATETIME_FORMAT),
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
      if (!this.isEditing) {
        this.router.navigate(['/dash/transaction/', data.id]);
      }
      if (this.isEditing) {
        Object.assign(this.transaction, data);
      }
      this.modal.hide();
      TransactionFormModalComponent.CHANGE.emit();
      /**
       * This change effects profile balance, so let's refresh profile
       */
      this.profileService.refresh();
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

  /**
   * Delete transaction
   *
   * @param transaction Transaction ID
   */
  delete(transaction: Transaction): void {
    if (!confirm('Are you sure you want to delete this transaction?')) {
      return;
    }
    this.api.transaction.delete(transaction.id).subscribe((): void => {
      this.modal.hide();
      TransactionFormModalComponent.CHANGE.emit();
      /**
       * This change effects profile balance, so let's refresh profile
       */
      this.profileService.refresh();
    });
  }

  /**
   * Open up icon form modal
   */
  addEvent(): void {
    const modal: BsModalRef = this.modalService.show(EventFormModalComponent, {
      initialState: {
        redirect: false,
      },
    });
    modal.content.submitted.subscribe((event: Event): void => {
      this.events.unshift(event);
      this.form.form.get('event').patchValue(event.id);
    });
  }


  /**
   * Open up wallet form modal
   */
  addWallet(): void {
    const modal: BsModalRef = this.modalService.show(WalletFormModalComponent, {
      initialState: {
        redirect: false,
      },
    });
    modal.content.submitted.subscribe((wallet: Wallet): void => {
      this.wallets.unshift(wallet);
      this.form.form.get('wallet').patchValue(wallet.id);
    });
  }

  /**
   * On click on add on category selection.
   */
  addCategory(): void {
    const modal: BsModalRef = this.modalService.show(CategoryFormModalComponent, {
      initialState: {
        redirect: false,
      },
    });
    modal.content.submitted.subscribe((category: Category): void => {
      this.categories.unshift(category);
      this.categoryGroups[category.kind].unshift(category);
      this.form.form.get('category').patchValue(category.id);
    });
  }
}
