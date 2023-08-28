import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectColorModule } from '@shared/modules/select-color/select-color.module';
import { SelectModule } from '@shared/modules/select/select.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TagFormModalComponent } from './tag-form-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    TagFormModalComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SelectColorModule,
    SelectModule,
    CollapseModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
})
export class TagFormModalModule {
}
