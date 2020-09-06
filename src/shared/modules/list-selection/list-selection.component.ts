import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListSelection } from 'src/shared/modules/list-selection/shared/list-selection';

@Component({
  selector: 'app-list-selection',
  templateUrl: './list-selection.component.html',
  styleUrls: ['./list-selection.component.scss'],
})
export class ListSelectionComponent {

  /**
   * List
   */
  @Input() list: ListSelection[];

  /**
   * Update parent on change
   */
  @Output() update = new EventEmitter<ListSelection[]>();

  /**
   * Main select checkbox (used to select and deselect all)
   */
  select: boolean;

  /**
   * @returns Selected list
   */
  get listSelected(): ListSelection[] {
    return this.list.filter(object => object.select === true);
  }

  /**
   * @returns Whether select is indeterminate or not
   */
  get isSelectIndeterminate(): boolean {
    return Boolean(this.list.length > this.listSelected.length && this.listSelected.length > 0);
  }

  /**
   * Update
   */
  onUpdate(): void {
    this.update.emit(this.list);
  }

  /**
   * On main select checked or unchecked
   */
  onToggleSelect(): void {
    for (const object of this.list) {
      object.select = this.select;
    }
    this.onUpdate();
  }

  /**
   * On object selection changed
   */
  onObjectSelect(): void {
    this.select = this.listSelected.length === this.list.length;
    this.onUpdate();
  }

}

