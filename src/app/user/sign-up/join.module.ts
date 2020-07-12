import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { JoinRoutingModule } from 'src/app/user/sign-up/join-routing.module';
import { JoinComponent } from 'src/app/user/sign-up/join.component';

@NgModule({
  declarations: [
    JoinComponent,
  ],
  imports: [
    CommonModule,
    JoinRoutingModule,
    ReactiveFormsModule,
  ],
})
export class JoinModule {
}
