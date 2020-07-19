import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { Color } from '@shared/classes/color';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {

  readonly style = Color.style;
  readonly faSelected = faCheckCircle;

  /**
   * Input name
   */
  @Input() selectLabel: string;

  /**
   * Data list
   */
  @Input() items: SelectItem[];

  /**
   * Allow clear
   */
  @Input() allowClear = false;

  /**
   * On data selection
   */
  @Output() choose = new EventEmitter<SelectItem>();

  /**
   * On data clear
   */
  @Output() clear = new EventEmitter<void>();

  /**
   * Search query
   */
  search: string;

  /**
   * Selected item
   */
  selected: SelectItem;

  /**
   * Is editing
   */
  edit: boolean;

  /**
   * Select (or deselect) an item from the list
   */
  select(item: SelectItem): void {
    if (this.allowClear && item === this.selected) {
      this.selected = null;
      this.clear.emit();
    } else {
      this.choose.emit(item);
      this.selected = item;
    }
    this.edit = false;
    this.search = null;
  }
}
