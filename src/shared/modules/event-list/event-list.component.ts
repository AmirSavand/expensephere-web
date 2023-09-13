import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Color } from '@shared/classes/color';
import { Event } from '@shared/interfaces/event';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {

  readonly style = Color.style;

  readonly faEdit: IconDefinition = faPen;

  @Input() events: Event[];

  @Input() columnClass = 'col-xl-4';

  constructor(public dialog: MatDialog) {
  }

  /**
   * Open event form modal for editing
   */
  editEvent(event: Event): void {
    this.dialog.open(EventFormModalComponent, {
      data: { event },
    });
  }
}
