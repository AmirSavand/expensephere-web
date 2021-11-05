import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ApiResponse } from '@shared/interfaces/api-response';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/pagination.component';

/**
 * @example  <app-pager wrapperClass="mt-3"
 *                      [disabled]="loading"
 *                      [apiResponse]="apiResponse"
 *                      [paramsToCombine]="filtersSelected"
 *                      (pageChanged)="load()">
 *           </app-pager>
 *
 * @see https://valor-software.com/ngx-bootstrap/#/pagination
 */
@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
})
export class PagerComponent implements OnChanges {

  /**
   * Optional input data for DRF API response.
   *
   * It will use the data inside it to know total
   * items and other data.
   *
   * When data comes with no prev set, it will reset
   * the current page to 1. This is good so the
   * parent component doesn't have to set it to 1
   * after filtering or something.
   */
  @Input() apiResponse?: ApiResponse<any>;

  /**
   * If you have a dict of GET params to feed to your
   * API and want to combine "page" param into it then
   * set this input to that to make a reference and the
   * page param will be updated into it.
   */
  @Input() paramsToCombine: Record<string, string> = {};

  /**
   * Whether or not to render the pagination (ngIf).
   *
   * This will be automatically set to false when there's
   * no prev or next page from {@see apiResponse}.
   */
  @Input() show = true;

  @Input() wrapperClass = '';

  @Input() currentPage = 1;

  @Input() totalItems: number;

  @Input() itemsPerPage = 100;

  @Input() maxSize = 6;

  @Input() boundaryLinks = false;

  @Input() disabled = false;

  @Input() rotate = true;

  @Input() nextText?: string;

  @Input() previousText?: string;

  @Output() pageChanged = new EventEmitter<PageChangedEvent>();

  @Output() numPages = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    // Check to see if apiResponse is set.
    if (changes.apiResponse?.currentValue) {
      // Update the local value.
      this.apiResponse = changes.apiResponse.currentValue;
      // Store the total items count.
      this.totalItems = this.apiResponse.count;
      // If there's no prev page, means it's first page, let's update it.
      if (!this.apiResponse.previous) {
        this.currentPage = 1;
      }
      // If there's no next or prev page, hide pager completely.
      this.show = Boolean(this.apiResponse.next || this.apiResponse.previous);
    }
  }

  /**
   * When page changes, combine the page
   * with given params object.
   *
   * @see paramsToCombine
   */
  beforePageChanged(event: PageChangedEvent): void {
    this.paramsToCombine.page = String(event.page);
    this.pageChanged.emit(event);
  }
}
