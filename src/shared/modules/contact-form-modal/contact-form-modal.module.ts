import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GeneralErrorModule } from '@shared/modules/general-error/general-error.module';
import { SelectColorModule } from '@shared/modules/select-color/select-color.module';
import { SelectModule } from '@shared/modules/select/select.module';
import { ContactFormModalComponent } from './contact-form-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SelectColorModule,
    SelectModule,
    GeneralErrorModule,
  ],
  declarations: [
    ContactFormModalComponent,
  ],
})
export class ContactFormModalModule {
}
