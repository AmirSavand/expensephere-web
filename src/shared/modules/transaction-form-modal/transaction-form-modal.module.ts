import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryFormModalModule } from '@shared/modules/category-form-modal/category-form-modal.module';
import { SelectModule } from '@shared/modules/select/select.module';
import { TagFormModalModule } from '@shared/modules/tag-form-modal/tag-form-modal.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TransactionFormModalComponent } from './transaction-form-modal.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CollapseModule,
    SelectModule,
    CategoryFormModalModule,
    TagFormModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  declarations: [
    TransactionFormModalComponent,
  ],
})
export class TransactionFormModalModule {
}
