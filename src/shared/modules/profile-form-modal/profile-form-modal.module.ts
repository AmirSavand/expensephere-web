import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectModule } from '@shared/modules/select/select.module';

import { ProfileFormModalComponent } from './profile-form-modal.component';

@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        SelectModule,
    ],
    declarations: [
        ProfileFormModalComponent,
    ]
})
export class ProfileFormModalModule {
}
