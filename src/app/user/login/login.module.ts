import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from 'src/app/user/login/login-routing.module';
import { LoginComponent } from 'src/app/user/login/login.component';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {
}
