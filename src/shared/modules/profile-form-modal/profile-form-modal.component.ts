import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faMoneyBill, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Currency } from '@shared/interfaces/currency';
import { Profile } from '@shared/interfaces/profile';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ProfileService } from '@shared/services/profile.service';
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
   * Where to new profile on create?
   */
  @Input() redirectToDetailsOnCreate?: boolean;

  /**
   * list of currencies
   */
  currencies: SelectItem[];

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
              private router: Router,
              private formBuilder: UntypedFormBuilder) {
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
    Api.currency.list().subscribe((data: Currency[]): void => {
      this.currencies = [];
      for (const currency of data) {
        this.currencies.push({
          color: Color.COLORS_RESERVED.default,
          icon: 'money',
          id: currency.code,
          name: `${currency.code}`,
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
    let method: Observable<Profile> = Api.profile.create(payload);
    if (this.isEditing) {
      method = Api.profile.update(this.profile.id, payload);
    }
    method.subscribe((data: Profile): void => {
      /**
       * Is editing?
       * Update selected profile if it's being updated.
       */
      if (this.isEditing) {
        Object.assign(this.profile, data);
        if (data.id === ProfileService.profile.value.id) {
          ProfileService.profile.next(data);
        }
      }
      /**
       * Is creating?
       * Save it as selected profile.
       */
      else {
        ProfileService.profile.next(data);
        /**
         * Redirect to profile page on create?
         */
        if (this.redirectToDetailsOnCreate) {
          this.router.navigate(['/dash', 'profile', data.id]);
        }
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
    if (ProfileService.profile.value && ProfileService.profile.value.id === profile.id) {
      return alert('You can not delete a selected profile.\n\nSelect another profile then delete this one.');
    }
    if (!confirm('Are you sure you want to delete this profile?')) {
      return;
    }
    Api.profile.delete(profile.id).subscribe((): void => {
      this.modal.hide();
    });
  }
}
