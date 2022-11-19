import { Component, Input, Output, ViewChild, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
import { Invoice } from 'src/shared/interfaces/invoice';

@Component({
  selector: 'app-template-paper',
  templateUrl: './template-paper.component.html',
  styleUrls: ['./template-paper.component.scss'],
})
export class TemplatePaperComponent implements AfterViewInit {

  @Input() snapshotLoading = false;

  @Input() invoice: Invoice;

  @Output() snapshotElementLoad = new EventEmitter<ElementRef<HTMLDivElement>>();

  @ViewChild('snapshotElement') snapshotElement: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.snapshotElementLoad.emit(this.snapshotElement);
  }
}
