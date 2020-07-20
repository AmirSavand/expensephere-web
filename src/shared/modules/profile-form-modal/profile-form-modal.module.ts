import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectModule } from '@shared/modules/select/select.module';
import { ProfileFormModalComponent } from 'src/shared/modules/profile-form-modal/profile-form-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SelectModule,
  ],
  declarations: [
    ProfileFormModalComponent,
  ],
  entryComponents: [
    ProfileFormModalComponent,
  ],
})
export class ProfileFormModalModule { }
