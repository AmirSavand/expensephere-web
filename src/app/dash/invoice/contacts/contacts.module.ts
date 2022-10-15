import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactFormModalModule } from '@shared/modules/contact-form-modal';
import { FiltersModule } from '@shared/modules/filters/filters.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NoDataModule } from '@shared/modules/no-data/no-data.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';

@NgModule({
  declarations: [
    ContactsComponent,
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FontAwesomeModule,
    LoadingModule,
    NoDataModule,
    FiltersModule,
    ContactFormModalModule,
  ],
})
export class ContactsModule {
}
