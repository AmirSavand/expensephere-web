import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { Api } from '@shared/classes/api';
import { ApiResponse } from '@shared/interfaces/api-response';
import { TransactionsPage } from '@shared/interfaces/transactions-page';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {

  readonly faInfo: IconDefinition = faInfoCircle;
  readonly faShare: IconDefinition = faShare;
  readonly faCreate: IconDefinition = faPlusCircle;
  readonly faEdit: IconDefinition = faPen;
  readonly faDelete: IconDefinition = faTrash;
  readonly faBreadcrumbArrow: IconDefinition = faChevronRight;

  pages: TransactionsPage[];

  /**
   * API loading indicator.
   * Used to disable buttons.
   */
  loading: boolean;

  ngOnInit(): void {
    /**
     * Get list of transactions pages.
     */
    Api.transactionsPage.list().subscribe((data: ApiResponse<TransactionsPage>): void => {
      this.pages = data.results;
    });
  }

  /**
   * Update note of a transactions page.
   */
  update(page: TransactionsPage): void {
    const note: string = prompt('Enter note for this transactions page:');
    if (note === null) {
      return;
    }
    this.loading = true;
    Api.transactionsPage.update(page.id, { note }).subscribe((): void => {
      this.loading = false;
      page.note = note;
    }, (): void => {
      this.loading = false;
      alert('Failed to update note of this transactions page.');
    });
  }

  /**
   * Delete a transactions page.
   */
  delete(page: TransactionsPage): void {
    this.loading = true;
    Api.transactionsPage.delete(page.id).subscribe((): void => {
      this.loading = false;
      this.pages.splice(this.pages.indexOf(page), 1);
    }, (): void => {
      this.loading = false;
      alert('Failed to delete this page.');
    });
  }
}
