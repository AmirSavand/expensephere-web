import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faInfoCircle, faPaintBrush, faIcons, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { ExpenseKind } from '@shared/enums/kind';
import { Category } from '@shared/interfaces/category';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';
import { ProfileService } from '@shared/services/profile.service';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-form-modal',
  templateUrl: './category-form-modal.component.html',
  styleUrls: ['./category-form-modal.component.scss'],
})
export class CategoryFormModalComponent implements OnInit {

  /**
   * Triggered when data is deleted, updated or created.
   */
  static readonly CHANGE: EventEmitter<void> = new EventEmitter();

  readonly faClose: IconDefinition = faTimes;
  readonly faInfo: IconDefinition = faInfoCircle;
  readonly faPaint: IconDefinition = faPaintBrush;
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
   * Redirect after creation?
   */
  @Input() redirect = true;

  /**
   * Triggered when category is created or modified
   * API call completed (successfully).
   */
  @Output() readonly submitted = new EventEmitter<Category>();

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

  constructor(
              private formBuilder: UntypedFormBuilder,
              private router: Router,
              private _snackbar: MatSnackBar,
              public dialogRef: MatDialogRef<CategoryFormModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { category: Category, redirect : boolean }) {
  }

  ngOnInit(): void {
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      profile: [ProfileService.profile.value.id],
      kind: [ExpenseKind.EXPENSE, Validators.required],
      name: [null, Validators.required],
      color: [null, Validators.required],
      icon: [null, Validators.required],
      archive: [false],
    });
    /**
     * Check if editing
     */
    if (this.data?.category) {
      this.isEditing = true;
      this.form.form.patchValue({
        kind: this.data.category.kind,
        name: this.data.category.name,
        color: this.data.category.color,
        icon: this.data.category.icon,
        archive: this.data.category.archive,
      });
    }
  }

  /**
   * Form submission
   */
  submit(): void {
    this.form.loading = true;
    const payload: Partial<Category> = this.form.form.value;
    let method: Observable<Category> = Api.category.create(payload);
    if (this.isEditing) {
      method = Api.category.update(this.data.category.id, payload);
    }
    method.subscribe((data: Category): void => {
      if (this.data?.redirect == null && !this.isEditing) {
        this.router.navigate(['/dash/category/', data.id]);
      }
      if (this.isEditing) {
        Object.assign(this.data.category, data);
      }
      this.submitted.emit(data);
      this.dialogRef.close();
      CategoryFormModalComponent.CHANGE.emit();
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
    this._snackbar.open('Category created successfully!', 'close')
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
    Api.category.delete(category.id).subscribe((): void => {
      CategoryFormModalComponent.CHANGE.emit();
    });
  }
}
