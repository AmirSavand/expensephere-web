import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons/faStickyNote';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Color } from '@shared/classes/color';
import { Currency } from '@shared/interfaces/currency';
import { Profile } from '@shared/interfaces/profile';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ApiService } from '@shared/services/api.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-form-modal',
  templateUrl: './profile-form-modal.component.html',
  styleUrls: ['./profile-form-modal.component.scss'],
})
export class ProfileFormModalComponent implements OnInit {

  readonly faClose: IconDefinition = faTimes;
  readonly faInfo: IconDefinition = faInfoCircle;
  readonly faNote: IconDefinition = faStickyNote;
  readonly faCurrency: IconDefinition = faMoneyBill;
  readonly faTrash: IconDefinition = faTrash;

  /**
   * Editing profile data
   */
  @Input() profile?: Profile;

  /**
   * list of currencies
   */
  currencies: SelectItem[] = [];

  /**
   * Form data
   */
  form: ReactiveFormData = {
    error: {},
  };

  /**
   * If {@see profile} is given, then the modal is for edit
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
      name: ['Me', Validators.required],
      currency: [null, Validators.required],
      note: [null],
    });
    /**
     * Get list of currencies
     */
    this.api.currency.list().subscribe((data: Currency[]): void => {
      for (const currency of data) {
        this.currencies.push({
          color: Color.COLORS_RESERVED.default,
          icon: 'money',
          id: currency.code,
          name: `${currency.code} (${currency.name})`
        });
      }
    });
    /**
     * Check if editing
     */
    if (this.profile) {
      this.isEditing = true;
      this.form.form.patchValue({
        name: this.profile.name,
        currency: this.profile.currency,
        note: this.profile.note,
      });
    }
  }

  /**
   * Add new profile
   */
  submit(): void {
    this.form.loading = true;
    const payload: Partial<Profile> = this.form.form.value;
    let method: Observable<Profile> = this.api.profile.create(payload);
    if (this.isEditing) {
      method = this.api.profile.update(this.profile.id, payload);
    }
    method.subscribe((data: Profile): void => {
      if (this.isEditing) {
        Object.assign(this.profile, data);
      }
      this.modal.hide();
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
  }

  /**
   * Delete profile
   *
   * @param profile Profile ID
   */
  delete(profile: Profile): void {
    if (!confirm('Are you sure you want to delete this profile?')) {
      return;
    }
    this.api.profile.delete(profile.id).subscribe((): void => {
      this.modal.hide();
    });
  }
}
