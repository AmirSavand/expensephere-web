import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faTimes, faTrash, faMapMarker, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Contact } from '@shared/interfaces/contact';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { ProfileService } from '@shared/services/profile.service';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  constructor(private formBuilder: UntypedFormBuilder,
              private profileService: ProfileService,
              private router: Router,
              public dialogRef: MatDialogRef<ContactFormModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { contact: Contact , redirect : boolean }) {
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
    if (this.data?.contact) {
      this.isEditing = true;
      this.form.form.patchValue({
        name: this.data.contact.name,
        email: this.data.contact.email,
        phone: this.data.contact.phone,
        website: this.data.contact.website,
        address: this.data.contact.address,
      });
    }
  }

  /** Add new contact */
  submit(): void {
    this.form.loading = true;
    let method: Observable<Contact> = Api.invoiceContact.create(this.form.form.value);
    if (this.isEditing) {
      method = Api.invoiceContact.update(this.data.contact.id, this.form.form.value);
    }
    method.subscribe({
      next: (data: Contact): void => {
        if (this.data?.redirect == null && !this.isEditing) {
          this.router.navigate(['/dash/invoice/contacts/']);
        }
        if (this.isEditing) {
          Object.assign(this.data.contact, data);
        }
        this.submitted.emit(data);
        this.dialogRef.close();
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
        this.dialogRef.close();
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
