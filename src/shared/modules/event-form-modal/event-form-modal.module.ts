import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectColorModule } from '@shared/modules/select-color/select-color.module';
import { SelectModule } from '@shared/modules/select/select.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { EventFormModalComponent } from './event-form-modal.component';


@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        CollapseModule,
        SelectColorModule,
        SelectModule,
    ],
    declarations: [
        EventFormModalComponent,
    ]
})
export class EventFormModalModule {
}
