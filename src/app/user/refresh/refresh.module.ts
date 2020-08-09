import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from '@shared/modules/loading/loading.module';

import { RefreshRoutingModule } from './refresh-routing.module';
import { RefreshComponent } from './refresh.component';

@NgModule({
  declarations: [
    RefreshComponent,
  ],
  imports: [
    CommonModule,
    RefreshRoutingModule,
    LoadingModule,
  ],
})
export class RefreshModule {
}
