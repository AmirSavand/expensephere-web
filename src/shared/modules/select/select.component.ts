import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { Color } from '@shared/classes/color';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnChanges {

  readonly style = Color.style;

  readonly faSelected: IconDefinition = faCheckCircle;
  readonly faClose: IconDefinition = faTimes;
  readonly faAdd: IconDefinition = faPlus;

  /**
   * Input name
   */
  @Input() selectLabel: string;

  /**
   * Item list for selection
   */
  @Input() items: SelectItem[] = [];

  /**
   * Raw item list for generation of main item list.
   */
  @Input() set rawItems(items: Record<string, any>[]) {
    if (items) {
      for (const item of items) {
        this.items.push({
          id: item[this.rawItemIdKey],
          name: item[this.rawItemLabelKey],
        });
      }
    }
  }

  /**
   * Raw item key name for generating "item.id".
   */
  @Input() rawItemIdKey = 'id';

  /**
   * Raw item key name for generating "item.value".
   */
  @Input() rawItemLabelKey = 'name';

  /**
   * Item ID that is selected
   */
  @Input() selectedId: SelectItem['id'];

  /**
   * Allow clear
   */
  @Input() allowClear = false;

  /**
   * Show add button
   */
  @Input() showAdd = false;

  /**
   * On data selection
   */
  @Output() choose = new EventEmitter<SelectItem>();

  /**
   * On data clear
   */
  @Output() clear = new EventEmitter<void>();

  /**
   * On click on add button
   */
  @Output() add = new EventEmitter<void>();

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
    /**
     * Generate items from rawItems.
     */
    if (changes.selectedId && changes.selectedId.currentValue) {
      this.selectedId = changes.selectedId.currentValue;
      /**
       * If selected item has changed, close the selection.
       */
      this.edit = false;
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
