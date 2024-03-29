import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faClock, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronDown,
  faIcons,
  faInfoCircle,
  faPaintBrush,
  faPiggyBank,
  faTimes,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { Tag } from '@shared/interfaces/tag';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tag-form-modal',
  templateUrl: './tag-form-modal.component.html',
  styleUrls: ['./tag-form-modal.component.scss'],
})
export class TagFormModalComponent implements OnInit {

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
   * Colors for selection
   */
  readonly colors: string[] = Color.COLORS;

  /**
   * Icons for selection
   */
  readonly icons: SelectItem[] = Utils.getSelectItemFromIcons();

  /**
   * Triggered when tag is created or modified
   * API call completed (successfully).
   */
  @Output() readonly submitted = new EventEmitter<Tag>();

  /**
   * Editing tag data
   */
  @Input() tag?: Tag;

  /**
   * Redirect after creation?
   */
  @Input() redirect = true;

  /**
   * Form data
   */
  form: ReactiveFormData = {
    error: {},
  };

  showExtraDetails = false;

  /**
   * If {@see tag} is given, then the modal is for edit
   */
  isEditing: boolean;

  constructor(public modal: BsModalRef,
              private formBuilder: UntypedFormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      profile: [ProfileService.profile.value.id],
      name: [null, Validators.required],
      color: [null, Validators.required],
      icon: [null, Validators.required],
      archive: [false],
      note: [''],
    });

    if (this.tag) {
      this.isEditing = true;
      this.form.form.patchValue({
        name: this.tag.name,
        color: this.tag.color,
        icon: this.tag.icon,
        note: this.tag.note,
        archive: this.tag.archive,
      });
    }
  }

  /**
   * Add new tag
   */
  submit(): void {
    this.form.loading = true;
    const payload: Partial<Tag> = this.form.form.value;
    let method: Observable<Tag> = Api.tag.create(payload);
    if (this.isEditing) {
      method = Api.tag.update(this.tag.id, payload);
    }
    method.subscribe((data: Tag): void => {
      if (this.redirect && !this.isEditing) {
        this.router.navigate(['/dash/tag/', data.id]);
      }
      if (this.isEditing) {
        Object.assign(this.tag, data);
      }
      this.submitted.emit(data);
      this.modal.hide();
      TagFormModalComponent.CHANGE.emit();
    }, (error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    });
  }

  /**
   * Delete tag
   *
   * @param tag Event ID
   */
  delete(tag: Tag): void {
    if (!confirm('Are you sure you want to delete this tag?')) {
      return;
    }
    Api.tag.delete(tag.id).subscribe((): void => {
      this.modal.hide();
      TagFormModalComponent.CHANGE.emit();
    });
  }
}
