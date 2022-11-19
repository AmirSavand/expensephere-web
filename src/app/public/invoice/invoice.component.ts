import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ElementRef, HostListener, Inject, ChangeDetectorRef } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faImage, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Utils } from '@shared/classes/utils';
import { Invoice } from '@shared/interfaces/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {

  readonly faDownload: IconDefinition = faDownload;
  readonly faImage: IconDefinition = faImage;
  readonly faPDF: IconDefinition = faFilePdf;
  readonly faCollapse: IconDefinition = faTimes;

  snapshotElement: ElementRef<HTMLDivElement>;

  snapshotLoading = false;

  invoice: Invoice;

  error: boolean;

  overlayView: 'main' | 'download' = 'main';

  overlayShow = true;

  lastScrollPosition = 0;

  constructor(@Inject(DOCUMENT) private document: Document,
              private changeDetectorRef: ChangeDetectorRef,
              private route: ActivatedRoute) {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.overlayShow = window.scrollY - this.lastScrollPosition < 0;
    this.lastScrollPosition = window.scrollY;
  }

  ngOnInit(): void {
    /**
     * Get and watch invoice ID from params.
     */
    this.route.params.subscribe((params: Params): void => {
      if (params.id) {
        Api.invoice.retrieve(params.id).subscribe({
          next: (data: Invoice): void => {
            this.invoice = data;
          },
          error: (): void => {
            this.error = true;
          },
        });
      }
    });
  }

  /** Download invoice with various types. */
  download(type: 'pdf' | 'image'): void {
    this.overlayView = 'main';
    this.snapshotLoading = true;
    this.changeDetectorRef.detectChanges();
    Utils.domToCanvas(this.snapshotElement.nativeElement, this.document).subscribe({
      next: (canvas: HTMLCanvasElement): void => {
        const name = `Expensephere_Invoice_${this.invoice.invoice_id}`;
        switch (type) {
          case 'pdf':
            Utils.canvasToPdf(canvas, name);
            break;
          case 'image':
            Utils.downloadFromUrl(canvas.toDataURL(), `${name}.png`);
            break;
        }
        canvas.remove();
        this.snapshotLoading = false;
      },
    });
  }
}
