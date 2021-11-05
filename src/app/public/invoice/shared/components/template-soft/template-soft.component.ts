import { Component, Input } from '@angular/core';
import { Invoice } from '@shared/interfaces/invoice';

@Component({
  selector: 'app-template-soft',
  templateUrl: './template-soft.component.html',
  styleUrls: ['./template-soft.component.scss'],
})
export class TemplateSoftComponent {
  @Input() invoice: Invoice;
}
