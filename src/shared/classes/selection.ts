/**
 * Takes a list of items and handles selection for them.
 */
export class Selection<T> {

  /**
   * @param items List of original items to set up selection for.
   * @param id Item unique property key to store selection by.
   */
  constructor(public items: T[], public id: string = 'id') {
  }

  /**
   * Selection dict.
   *
   * This is where we keep which item is selected (value true)
   * and which item is not (value not true).
   */
  selection: Record<string | number, boolean> = {};

  /**
   * Number of selected items
   */
  selected = 0;

  /**
   * Number of deselected items
   */
  deselected: number = this.items.length;

  /**
   * Is selection indeterminate?
   */
  indeterminate: boolean;

  /**
   * @returns List of original items that are selected
   */
  get selectedItems(): T[] {
    // @ts-ignore
    return this.items.filter((item: T): boolean => this.selection[item[this.id]]);
  }

  /**
   * Update selected and deselected numbers.
   * Also update indeterminate status.
   */
  count(): void {
    this.selected = Object.values(this.selection).filter((status: boolean): boolean => status).length;
    this.deselected = this.items.length - this.selected;
    this.indeterminate = this.selected > 0 && this.deselected > 0;
  }

  /**
   * Select an item
   */
  select(item: T): void {
    // @ts-ignore
    this.selection[item[this.id]] = true;
    this.count();
  }

  /**
   * Deselect an item
   */
  deselect(item: T): void {
    // @ts-ignore
    this.selection[item[this.id]] = false;
    this.count();
  }

  /**
   * Toggle an item selection status
   */
  toggle(item: T): void {
    // @ts-ignore
    this.selection[item[this.id]] = !this.selection[item[this.id]];
    this.count();
  }

  /**
   * Select all items
   */
  selectAll(): void {
    for (const item of this.items) {
      this.select(item);
    }
  }

  /**
   * Deselect all items
   */
  deselectAll(): void {
    for (const item of this.items) {
      this.deselect(item);
    }
  }

  /**
   * Select all if selection is indeterminate or no item is selected
   * otherwise deselect all.
   */
  selectDeselectAll(): void {
    if (this.indeterminate || !this.selected) {
      this.selectAll();
    } else {
      this.deselectAll();
    }
  }
}

