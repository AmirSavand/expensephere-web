import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Utils } from '@shared/classes/utils';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Contact } from '@shared/interfaces/contact';
import { GetParams } from '@shared/interfaces/get-params';
import { ContactFormModalComponent } from '@shared/modules/contact-form-modal';
import { FilterType } from '@shared/modules/filters/shared/enums/filter-type';
import { Filter } from '@shared/modules/filters/shared/interfaces/filter';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {

  readonly faUpdate: IconDefinition = faPen;
  readonly faBreadcrumbArrow: IconDefinition = faChevronRight;

  readonly filters: Filter[] = [
    {
      type: FilterType.TEXT,
      label: 'Search',
      key: 'search',
      value: '',
    },
  ];

  /** Filters param. */
  params: GetParams;

  /** List of contacts. */
  contacts: Contact[];

  /** Delete API loading indicator. */
  deleting = false;

  constructor(private modalService: BsModalService) {
  }

  load(): void {
    Api.invoiceContact.list(this.params).subscribe({
      next: (data: ApiResponse<Contact>): void => {
        this.contacts = data.results;
      },
    });
  }

  update(contact: Contact): void {
    const modal: BsModalRef<ContactFormModalComponent> = this.modalService.show(ContactFormModalComponent, {
      initialState: { contact },
    });
    modal.content.destroyed.subscribe({
      next: (): void => {
        Utils.removeChild(this.contacts, contact);
      },
    });
  }

  create(): void {
    const modal: BsModalRef<ContactFormModalComponent> = this.modalService.show(ContactFormModalComponent);
    modal.content.submitted.subscribe({
      next: (data: Contact): void => {
        this.contacts.push(data);
      },
    });
  }
}
