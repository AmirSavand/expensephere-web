import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons/faMoneyBillAlt';
import { faIcons } from '@fortawesome/free-solid-svg-icons/faIcons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons/faPaintBrush';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { Wallet } from '@shared/interfaces/wallet';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wallet-form-modal',
  templateUrl: './wallet-form-modal.component.html',
  styleUrls: ['./wallet-form-modal.component.scss'],
})
export class WalletFormModalComponent implements OnInit {

  /**
   * Triggered when data is deleted, updated or created.
   */
  static readonly CHANGE: EventEmitter<void> = new EventEmitter();

  readonly faClose: IconDefinition = faTimes;
  readonly faInfo: IconDefinition = faInfoCircle;
  readonly faPaint: IconDefinition = faPaintBrush;
  readonly faIcons: IconDefinition = faIcons;
  readonly faTrash: IconDefinition = faTrash;
  readonly faAmount: IconDefinition = faMoneyBillAlt;

  /**
   * Editing wallet data
   */
  @Input() wallet?: Wallet;

  /**
   * Redirect after creation?
   */
  @Input() redirect = true;

  /**
   * Colors for selection
   */
  readonly colors: string[] = Color.COLORS;

  /**
   * Icons for selection
   */
  readonly icons: SelectItem[] = Utils.getSelectItemFromIcons();

  /**
   * Triggered when wallet is created or modified
   * API call completed (successfully).
   */
  @Output() readonly submitted = new EventEmitter<Wallet>();

  /**
   * Form data
   */
  form: ReactiveFormData = {
    error: {},
  };

  /**
   * Current (profile) currency
   */
  currency: string;

  /**
   * If {@see wallet} is given, then the modal is for edit
   */
  isEditing: boolean;

  constructor(public modal: BsModalRef,
              private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    /**
     * Set currency
     */
    this.currency = ProfileService.profile.value.currency;
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      profile: [ProfileService.profile.value.id],
      name: [null, Validators.required],
      initial_balance: [null],
      color: [null, Validators.required],
      icon: [null, Validators.required],
      archive: [false],
    });
    /**
     * Check if editing
     */
    if (this.wallet) {
      this.isEditing = true;
      this.form.form.patchValue({
        name: this.wallet.name,
        color: this.wallet.color,
        icon: this.wallet.icon,
        archive: this.wallet.archive,
      });
    }
  }

  /**
   * Add new wallet
   */
  submit(): void {
    this.form.loading = true;
    /**
     * Initial balance is only for creation, so let's remove
     * it from edition form.
     */
    if (this.isEditing) {
      this.form.form.removeControl('initial_balance');
    }
    const payload: Partial<Wallet> = this.form.form.value;
    /**
     * Initial balance should only be sent if it has a value.
     * That means no `""`, no `null` and no `0`.
     */
    if (!(Math.abs(payload.initial_balance) > 0)) {
      delete payload.initial_balance;
    }
    let method: Observable<Wallet> = Api.wallet.create(payload);
    if (this.isEditing) {
      method = Api.wallet.update(this.wallet.id, payload);
    }
    method.subscribe((data: Wallet): void => {
      if (this.redirect && !this.isEditing) {
        this.router.navigate(['/dash/wallet/', data.id]);
      }
      if (this.isEditing) {
        Object.assign(this.wallet, data);
      }
      this.submitted.emit(data);
      this.modal.hide();
      WalletFormModalComponent.CHANGE.emit();
      /**
       * This change effects profile balance, so let's refresh profile
       */
      this.profileService.refresh();
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
  }

  /**
   * Delete wallet
   *
   * @param wallet Wallet ID
   */
  delete(wallet: Wallet): void {
    if (!confirm('Are you sure you want to delete this wallet?')) {
      return;
    }
    Api.wallet.delete(wallet.id).subscribe((): void => {
      this.modal.hide();
      WalletFormModalComponent.CHANGE.emit();
    });
  }
}
