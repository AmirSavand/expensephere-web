import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Event } from '@shared/interfaces/event';
import { GetParams } from '@shared/interfaces/get-params';
import { EventFormModalComponent } from '@shared/modules/event-form-modal/event-form-modal.component';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

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

  /**
   * Params to filter data.
   */
  params: GetParams;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
    EventFormModalComponent.CHANGE.subscribe((): void => {
      this.load();
    });
  }

  /**
   * Load event with filters
   */
  load(): void {
    Api.event.list(this.params).subscribe((data: Event[]): void => {
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
