import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
})
export class UserModule {
}
