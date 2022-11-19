import { Component, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Invoice } from '@shared/interfaces/invoice';

@Component({
  selector: 'app-template-soft',
  templateUrl: './template-soft.component.html',
  styleUrls: ['./template-soft.component.scss'],
})
export class TemplateSoftComponent implements AfterViewInit {

  @Input() snapshotLoading = false;

  @Input() invoice: Invoice;

  @Output() snapshotElementLoad = new EventEmitter<ElementRef<HTMLDivElement>>();

  @ViewChild('snapshotElement') snapshotElement: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.snapshotElementLoad.emit(this.snapshotElement);
  }
}
