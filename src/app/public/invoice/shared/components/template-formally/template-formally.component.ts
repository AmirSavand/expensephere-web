import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Invoice } from '@shared/interfaces/invoice';

@Component({
  selector: 'app-template-formally',
  templateUrl: './template-formally.component.html',
  styleUrls: ['./template-formally.component.scss'],
})
export class TemplateFormallyComponent implements AfterViewInit {

  @Input() snapshotLoading = false;

  @Input() invoice: Invoice;

  @Output() snapshotElementLoad = new EventEmitter<ElementRef<HTMLDivElement>>();

  @ViewChild('snapshotElement') snapshotElement: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.snapshotElementLoad.emit(this.snapshotElement);
  }
}
