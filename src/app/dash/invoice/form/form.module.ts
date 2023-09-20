import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactFormModalModule } from '@shared/modules/contact-form-modal';
import { GeneralErrorModule } from '@shared/modules/general-error/general-error.module';
import { LoadingModule } from '@shared/modules/loading/loading.module';
import { NotFoundModule } from '@shared/modules/not-found/not-found.module';
import { ProfileCurrencyModule } from '@shared/modules/profile-currency/profile-currency.module';
import { SelectModule } from '@shared/modules/select/select.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [
    FormComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    FontAwesomeModule,
    NotFoundModule,
    LoadingModule,
    ReactiveFormsModule,
    SelectModule,
    GeneralErrorModule,
    ProfileCurrencyModule,
    ContactFormModalModule,
    ModalModule.forChild(),
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
})
export class FormModule {
}
