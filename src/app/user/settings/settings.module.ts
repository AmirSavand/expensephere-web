import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SettingsModule {
}
