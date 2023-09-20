import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMoneyBillAlt } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faPaintBrush, faIcons, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { Wallet } from '@shared/interfaces/wallet';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ProfileService } from '@shared/services/profile.service';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private formBuilder: UntypedFormBuilder,
              private profileService: ProfileService,
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<WalletFormModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { wallet: Wallet , redirect : boolean }) {
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
    if (this.data?.wallet) {
      this.isEditing = true;
      this.form.form.patchValue({
        name: this.data.wallet.name,
        color: this.data.wallet.color,
        icon: this.data.wallet.icon,
        archive: this.data.wallet.archive,
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
      method = Api.wallet.update(this.data.wallet.id, payload);
    }
    method.subscribe((data: Wallet): void => {
      if (this.data?.redirect == null && !this.isEditing) {
        this.router.navigate(['/dash/wallet/', data.id]);
      }
      if (this.isEditing) {
        Object.assign(this.data.wallet, data);
      }
      this.submitted.emit(data);
      this.dialogRef.close({wallet: data.id}) ;
      WalletFormModalComponent.CHANGE.emit();
      /**
       * This change effects profile balance, so let's refresh profile
       */
      this.profileService.refresh();
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
    if (!this.isEditing) {
      this._snackBar.open('Wallet created successfully!', 'close')
    }
    else {
      this._snackBar.open('Wallet updated!', 'close')
    }
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
      WalletFormModalComponent.CHANGE.emit();
    });
  }
}
