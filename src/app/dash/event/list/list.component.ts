import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Event } from '@shared/interfaces/event';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  readonly faEdit: IconDefinition = faPen;

  /**
   * Event list
   */
  events: Event[]

  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    /**
     * Load events
     */
    this.api.event.list().subscribe((data: Event[]): void => {
      this.events = data;
    });
  }

  /**
   * Open up event form modal
   */
  addEvent(): void {
    this.modalService.show(EventFormModalComponent, { class: 'modal-sm' });
  }

  /**
   * Open event form modal for editing
   */
  editEvent(event: Event): void {
    this.modalService.show(EventFormModalComponent, {
      class: 'modal-sm',
      initialState: { event },
    });
  }


}
