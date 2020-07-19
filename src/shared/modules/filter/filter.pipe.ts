import { Pipe, PipeTransform } from '@angular/core';

/**
 * Filter
 *
 * Search/filter list of items when using "*ngFor" attribute.
 * Default field to search is 'name', add second parameter for another field.
 *
 * @example <div *ngFor="let item of items | filter:search">...</div>
 * @example <div *ngFor="let user of users | filter:search:'branch'">...</div>
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   * @param items Array of items in ngFor
   * @param text Text to search
   * @param field The field name where we're going to search
   */
  transform(items: any[], text: string, field: string = 'name'): any[] {
    if (!items || !text) {
      return items;
    }
    return items.filter(item => {
      return item[field].toLowerCase().includes(text.toLowerCase());
    });
  }
}
