import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from '@app/dash/profile/profile-routing.module';
import { ProfileComponent } from '@app/dash/profile/profile.component';

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
