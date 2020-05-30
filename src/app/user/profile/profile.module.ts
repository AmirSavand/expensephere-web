import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from 'src/app/user/profile/profile-routing.module';
import { ProfileComponent } from 'src/app/user/profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
  ],
})
export class ProfileModule {
}
