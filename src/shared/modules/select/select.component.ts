import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { Color } from '@shared/classes/color';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnChanges {

  readonly style = Color.style;
  readonly faSelected = faCheckCircle;

  /**
   * Input name
   */
  @Input() selectLabel: string;

  /**
   * Item list for selection
   */
  @Input() items: SelectItem[];

  /**
   * Item ID that is selected
   */
  @Input() selectedId: SelectItem['id'];

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
   * Item that is selected
   */
  selected: SelectItem;

  /**
   * Search query
   */
  search: string;

  /**
   * Is editing
   */
  edit: boolean;

  /**
   * Update {@see selected} to reference value.
   */
  private updateSelected(): void {
    if (this.selectedId && this.items) {
      this.selected = this.items.find(item => item.id === this.selectedId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedId && changes.selectedId.currentValue) {
      this.selectedId = changes.selectedId.currentValue;
    }
    if (changes.items && changes.items.currentValue) {
      this.items = changes.items.currentValue;
    }
    this.updateSelected();
  }

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
