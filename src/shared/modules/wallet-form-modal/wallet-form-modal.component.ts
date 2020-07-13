import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { Color } from '@shared/classes/color';
import { icons } from '@shared/constants/icons';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { Transaction } from '@shared/interfaces/transaction';
import { Wallet } from '@shared/interfaces/wallet';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wallet-form-modal',
  templateUrl: './wallet-form-modal.component.html',
  styleUrls: ['./wallet-form-modal.component.scss']
})
export class WalletFormModalComponent implements OnInit {

  readonly faClose: IconDefinition = faTimes;

  @Input() wallet?: Wallet;

  /**
   * Colors for selection
   */
  readonly colors: string[] = Color.COLORS;

  /**
   * Icons for selection
   */
  readonly icons: readonly string[] = icons;

  form: ReactiveFormData = {
    error: {},
  };

  /**
   * If {@see wallet} is given, then the modal is for edit
   */
  isEditing: boolean;

  constructor(public modal: BsModalRef,
              private formBuilder: FormBuilder,
              private api: ApiService) {
  }

  ngOnInit(): void {
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      profile: [ProfileService.profile.id],
      name: [null, Validators.required],
      color: [null, Validators.required],
      icon: [null, Validators.required],
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
      })
    }
  }

  /**
   * Add new wallet
   */
  submit(): void {
    this.form.loading = true;
    const payload: Partial<Wallet> = this.form.form.value;
    let method: Observable<Wallet> = this.api.wallet.create(payload);
    if (this.isEditing) {
      method = this.api.wallet.update(this.wallet.id, payload);
    }
    method.subscribe((data:Wallet): void => {
      if (this.isEditing) {
        Object.assign(this.wallet, data);
      }
      this.modal.hide();
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
  }
}
