import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from '@environments/environment';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { Color } from '@shared/classes/color';
import { ExpenseKind } from '@shared/enums/kind';
import { TransactionsPage } from '@shared/interfaces/transactions-page';
import { TransactionsPageTransaction } from '@shared/interfaces/transactions-page-transaction';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {

  readonly expenseKind = ExpenseKind;
  readonly style = Color.style;
  readonly home = environment.home;
  readonly isSharingEnabled = Boolean(navigator.share);
  readonly shareUrl = location.href;
  readonly faCopy: IconDefinition = faCopy;
  readonly faCopied: IconDefinition = faCheck;
  readonly faShare: IconDefinition = faShareAlt;

  page: TransactionsPage;
  error: boolean;

  @ViewChild('copyInput') copyInput: ElementRef;

  copied: boolean;

  constructor(private route: ActivatedRoute,
              private api: ApiService) {
  }

  ngOnInit(): void {
    /**
     * Get and watch transactions page ID from params.
     */
    this.route.params.subscribe((params: Params): void => {
      if (params.id) {
        this.api.transactionsPage.retrieve(params.id).subscribe((data: TransactionsPage): void => {
          this.page = data;
          /**
           * Generate transaction title based on category name and its note.
           */
          for (const transaction of this.page.transactions as TransactionsPageTransaction[]) {
            transaction.title = transaction.category.name;
            if (transaction.note) {
              transaction.title = transaction.note.split('\n')[0];
              if (transaction.title.length > 21) {
                transaction.title = transaction.title.substring(0, 21) + '...';
              }
            }
          }
        }, (): void => {
          this.error = true;
        });
      }
    });
  }

  share(): void {
    if (this.isSharingEnabled) {
      navigator.share({
        text: this.page.note,
        url: this.shareUrl,
        title: `Expensephere - Shared Transactions Page by ${this.page.user.name}`,
      }).then();
    } else {
      (this.copyInput.nativeElement as HTMLInputElement).select();
      this.copied = document.execCommand('copy');
      setTimeout((): void => {
        delete this.copied;
      }, 5000);
    }
  }
}
