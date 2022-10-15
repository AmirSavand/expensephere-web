import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faTimes, faTrash, faMapMarker, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Contact } from '@shared/interfaces/contact';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-form-modal',
  templateUrl: './contact-form-modal.component.html',
  styleUrls: ['./contact-form-modal.component.scss'],
})
export class ContactFormModalComponent implements OnInit {

  /** Triggered when data is deleted, updated or created. */
  static readonly CHANGE: EventEmitter<void> = new EventEmitter();

  readonly faClose: IconDefinition = faTimes;
  readonly faName: IconDefinition = faInfoCircle;
  readonly faEmail: IconDefinition = faEnvelope;
  readonly faAddress: IconDefinition = faMapMarker;
  readonly faWebsite: IconDefinition = faGlobe;
  readonly faPhone: IconDefinition = faPhone;
  readonly faTrash: IconDefinition = faTrash;

  /** Editing contact data. */
  @Input() contact?: Contact;

  /** Redirect after creation?. */
  @Input() redirect = true;

  /**
   * Triggered when contact is created or modified.
   * API call completed (successfully).
   */
  @Output() readonly submitted = new EventEmitter<Contact>();

  /**
   * Triggered when contact is delete.
   * API call completed (successfully).
   */
  @Output() readonly destroyed = new EventEmitter<void>();

  /** Form data. */
  form: ReactiveFormData = {
    error: {},
  };

  /** Current (profile) currency. */
  currency: string;

  /** If {@see contact} is given, then the modal is for edit. */
  isEditing: boolean;

  constructor(public modal: BsModalRef,
              private formBuilder: UntypedFormBuilder,
              private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    /** Set up the form. */
    this.form.form = this.formBuilder.group({
      profile: [ProfileService.profile.value.id],
      name: [null, Validators.required],
      email: [null],
      phone: [null],
      website: [null],
      address: [null],
    });
    /** Check if editing. */
    if (this.contact) {
      this.isEditing = true;
      this.form.form.patchValue({
        name: this.contact.name,
        email: this.contact.email,
        phone: this.contact.phone,
        website: this.contact.website,
        address: this.contact.address,
      });
    }
  }

  /** Add new contact */
  submit(): void {
    this.form.loading = true;
    let method: Observable<Contact> = Api.invoiceContact.create(this.form.form.value);
    if (this.isEditing) {
      method = Api.invoiceContact.update(this.contact.id, this.form.form.value);
    }
    method.subscribe({
      next: (data: Contact): void => {
        if (this.redirect && !this.isEditing) {
          this.router.navigate(['/dash/invoice/contacts/']);
        }
        if (this.isEditing) {
          Object.assign(this.contact, data);
        }
        this.submitted.emit(data);
        this.modal.hide();
        ContactFormModalComponent.CHANGE.emit();
      },
      error: (error: HttpErrorResponse): void => {
        this.form.error = error.error;
        this.form.loading = false;
      },
    });
  }

  /**
   * Destroy contact
   *
   * @param contact Contact ID
   */
  destroy(contact: Contact): void {
    if (!confirm('Are you sure you want to delete this contact?')) {
      return;
    }
    this.form.loading = true;
    Api.invoiceContact.delete(contact.id).subscribe({
      next: (): void => {
        this.modal.hide();
        this.destroyed.emit();
        this.form.loading = false;
      },
      error: (error: HttpErrorResponse): void => {
        this.form.error = error.error;
        this.form.loading = false;
      },
    });
  }
}
