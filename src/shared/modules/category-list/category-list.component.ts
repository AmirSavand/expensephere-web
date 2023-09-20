import { Component, Inject, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Color } from '@shared/classes/color';
import { Category } from '@shared/interfaces/category';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {

  readonly style = Color.style;

  readonly faEdit: IconDefinition = faPen;

  @Input() categories: Category[];

  @Input() columnClass = 'col-xl-4';

  constructor(private dialog: MatDialog) {
  }

  /**
   * Open category form modal for editing
   */
  editCategory(category: Category): void {
    this.dialog.open(CategoryFormModalComponent, {
      data: { category },
    });
  }
}
