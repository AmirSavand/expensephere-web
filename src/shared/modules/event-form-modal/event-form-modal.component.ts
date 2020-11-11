import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons/faStickyNote';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faIcons } from '@fortawesome/free-solid-svg-icons/faIcons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons/faPaintBrush';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons/faPiggyBank';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { Event } from '@shared/interfaces/event';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Wallet } from 'src/shared/interfaces/wallet';

@Component({
  selector: 'app-event-form-modal',
  templateUrl: './event-form-modal.component.html',
  styleUrls: ['./event-form-modal.component.scss'],
  providers: [DatePipe],
})
export class EventFormModalComponent implements OnInit {

  /**
   * Triggered when data is deleted, updated or created.
   */
  static readonly CHANGE: EventEmitter<void> = new EventEmitter();

  readonly faClose: IconDefinition = faTimes;
  readonly faTime: IconDefinition = faClock;
  readonly faInfo: IconDefinition = faInfoCircle;
  readonly faPaint: IconDefinition = faPaintBrush;
  readonly faBudget: IconDefinition = faPiggyBank;
  readonly faIcons: IconDefinition = faIcons;
  readonly faNote: IconDefinition = faStickyNote;
  readonly faCollapse: IconDefinition = faChevronDown;
  readonly faTrash: IconDefinition = faTrash;

  /**
   * Editing event data
   */
  @Input() event?: Event;

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
   * Triggered when event is created or modified
   * API call completed (successfully).
   */
  @Output() readonly submitted = new EventEmitter<Event>();

  /**
   * Form data
   */
  form: ReactiveFormData = {
    error: {},
  };

  showExtraDetails = false;

  /**
   * If {@see event} is given, then the modal is for edit
   */
  isEditing: boolean;

  /**
   * Current (profile) currency
   */
  currency: string;

  constructor(public modal: BsModalRef,
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
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      profile: [ProfileService.profile.value.id],
      name: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
      color: [null, Validators.required],
      icon: [null, Validators.required],
      budget: [null],
      archive: [false],
      note: [''],
    });
    /**
     * Check if editing
     */
    if (this.event) {
      this.isEditing = true;
      this.form.form.patchValue({
        name: this.event.name,
        start: this.date.transform(this.event.start, Utils.HTML_DATETIME_FORMAT),
        end: this.date.transform(this.event.end, Utils.HTML_DATETIME_FORMAT),
        color: this.event.color,
        icon: this.event.icon,
        budget: this.event.budget,
        note: this.event.note,
        archive: this.event.archive,
      });
    }
  }

  /**
   * Add new event
   */
  submit(): void {
    this.form.loading = true;
    const payload: Partial<Event> = Object.assign(this.form.form.value, {
      start: new Date(this.form.form.value.start).toISOString(),
      end: new Date(this.form.form.value.end).toISOString(),
    });
    let method: Observable<Event> = this.api.event.create(payload);
    if (this.isEditing) {
      method = this.api.event.update(this.event.id, payload);
    }
    method.subscribe((data: Event): void => {
      if (this.redirect && !this.isEditing) {
        this.router.navigate(['/dash/event/', data.id]);
      }
      if (this.isEditing) {
        Object.assign(this.event, data);
      }
      this.submitted.emit(data);
      this.modal.hide();
      EventFormModalComponent.CHANGE.emit();
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
  }

  /**
   * Delete event
   *
   * @param event Event ID
   */
  delete(event: Event): void {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }
    this.api.event.delete(event.id).subscribe((): void => {
      this.modal.hide();
      EventFormModalComponent.CHANGE.emit();
    });
  }
}
