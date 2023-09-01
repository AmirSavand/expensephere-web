import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectModule } from '@shared/modules/select/select.module';
import { ProfileFormModalComponent } from './profile-form-modal.component';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [
    ProfileFormModalComponent,
  ],
})
export class ProfileFormModalModule {
}
