import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileFormModalComponent } from 'src/shared/modules/profile-form-modal/profile-form-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ProfileFormModalComponent,
  ],
  entryComponents: [
    ProfileFormModalComponent,
  ],
})
export class ProfileFormModalModule { }
