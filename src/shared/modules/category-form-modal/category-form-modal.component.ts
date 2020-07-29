import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCube } from '@fortawesome/free-solid-svg-icons/faCube';
import { faIcons } from '@fortawesome/free-solid-svg-icons/faIcons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faPaintBrush } from '@fortawesome/free-solid-svg-icons/faPaintBrush';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category-form-modal.component.html',
  styleUrls: ['./category-form-modal.component.scss'],
})
export class CategoryFormModalComponent implements OnInit {

  readonly faClose: IconDefinition = faTimes;
  readonly faInfo: IconDefinition = faInfoCircle;
  readonly faPaint: IconDefinition = faPaintBrush;
  readonly faCube: IconDefinition = faCube;
  readonly faIcons: IconDefinition = faIcons;
  readonly faTrash: IconDefinition = faTrash;

  /**
   * Expense kind for selection
   */
  readonly expenseKind = ExpenseKind;

  /**
   * Colors for selection
   */
  readonly colors: string[] = Color.COLORS;

  /**
   * Icons for selection
   */
  readonly icons: SelectItem[] = Utils.getSelectItemFromIcons();

  /**
   * Editing category data
   */
  @Input() category?: Category;

  /**
   * Form data
   */
  form: ReactiveFormData = {
    error: {},
  };

  /**
   * If {@see category} is given, then the modal is for edit
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
      kind: [ExpenseKind.EXPENSE, Validators.required],
      name: [null, Validators.required],
      color: [null, Validators.required],
      icon: [null, Validators.required],
      archive: [null],
    });
    /**
     * Check if editing
     */
    if (this.category) {
      this.isEditing = true;
      this.form.form.patchValue({
        kind: this.category.kind,
        name: this.category.name,
        color: this.category.color,
        icon: this.category.icon,
        archive: this.category.archive,
      });
    }
  }

  /**
   * Add new wallet
   */
  submit(): void {
    this.form.loading = true;
    const payload: Partial<Category> = this.form.form.value;
    let method: Observable<Category> = this.api.category.create(payload);
    if (this.isEditing) {
      method = this.api.category.update(this.category.id, payload);
    }
    method.subscribe((data: Category): void => {
      if (this.isEditing) {
        Object.assign(this.category, data);
      }
      this.modal.hide();
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
  }

  /**
   * Delete category
   *
   * @param category Category ID
   */
  delete(category: Category): void {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }
    this.api.category.delete(category.id).subscribe((): void => {
      this.modal.hide();
    });
  }
}
