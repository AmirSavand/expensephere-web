import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SignOutRoutingModule } from './sign-out-routing.module';
import { SignOutComponent } from './sign-out.component';

@NgModule({
  declarations: [
    SignOutComponent,
  ],
  imports: [
    CommonModule,
    SignOutRoutingModule,
  ],
})
export class SignOutModule {
}
