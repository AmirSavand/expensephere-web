import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen';
import { Event } from '@shared/interfaces/event';
import { GetParams } from '@shared/interfaces/get-params';
import { Wallet } from '@shared/interfaces/wallet';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { ApiService } from '@shared/services/api.service';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {

  readonly faEdit: IconDefinition = faPen;

  readonly filters: Filter[] = [
    {
      type: FilterType.TEXT,
      label: 'Search',
      key: 'search',
      value: '',
    },
    {
      type: FilterType.BOOLEAN,
      label: 'Archive',
      key: 'archive',
      value: false,
    },
  ];

  /**
   * Event list
   */
  events: Event[];

  constructor(private api: ApiService,
              private modalService: BsModalService) {
  }

  /**
   * Load event with filters
   */
  load(params: GetParams): void {
    this.api.event.list(params).subscribe((data: Event[]): void => {
      this.events = data;
    });
  }

  /**
   * Open up event form modal
   */
  addEvent(): void {
    this.modalService.show(EventFormModalComponent, { class: 'modal-sm' });
  }
}
