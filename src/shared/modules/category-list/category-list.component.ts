import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Color } from '@shared/classes/color';
import { Category } from '@shared/interfaces/category';
import { CategoryFormModalComponent } from '@shared/modules/category-form-modal/category-form-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

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

  constructor(private modalService: BsModalService) {
  }

  /**
   * Open category form modal for editing
   */
  editCategory(category: Category): void {
    this.modalService.show(CategoryFormModalComponent, {
      initialState: { category },
    });
  }
}
