import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Color } from '@shared/classes/color';
import { Tag } from '@shared/interfaces/tag';
import { TagFormModalComponent } from '@shared/modules/tag-form-modal/tag-form-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent {

  readonly faEdit: IconDefinition = faPen;

  readonly style = Color.style;

  @Input() columnClass = 'col-xl-4';

  @Input() tags: Tag[];

  constructor(private modalService: BsModalService) {

  }

  /**
   * Open category form modal for editing
   */
  editTag(tag: Tag): void {
    this.modalService.show(TagFormModalComponent, {
      initialState: { tag },
    });
  }
}
