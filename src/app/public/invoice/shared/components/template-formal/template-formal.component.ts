import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Invoice } from '@shared/interfaces/invoice';

@Component({
  selector: 'app-template-formal',
  templateUrl: './template-formal.component.html',
  styleUrls: ['./template-formal.component.scss'],
})
export class TemplateFormalComponent implements AfterViewInit {

  @Input() snapshotLoading = false;

  @Input() invoice: Invoice;

  @Output() snapshotElementLoad = new EventEmitter<ElementRef<HTMLDivElement>>();

  @ViewChild('snapshotElement') snapshotElement: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.snapshotElementLoad.emit(this.snapshotElement);
  }
}
