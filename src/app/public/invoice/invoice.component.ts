import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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

  @ViewChild('wrapperElement') wrapperElement: ElementRef;

  invoice: Invoice;

  error: boolean;

  overlayView: 'main' | 'download' = 'main';

  overlayShow = true;

  lastScrollPosition = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.overlayShow = window.scrollY - this.lastScrollPosition < 0;
    this.lastScrollPosition = window.scrollY;
  }

  constructor(private route: ActivatedRoute) {
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

  saveAsPDFImage(): void {
    this.overlayView = 'main';
    Utils.elementToPDF(this.wrapperElement.nativeElement);
  }

  saveAsImage(): void {
    this.overlayView = 'main';
    Utils.elementToCanvas(this.wrapperElement.nativeElement).subscribe((canvas: HTMLCanvasElement): void => {
      const a: HTMLAnchorElement = document.createElement('a');
      a.href = canvas.toDataURL();
      a.download = `Expensephere_Invoice_${this.invoice.invoice_id}.png`;
      a.click();
      a.remove();
    });
  }
}
