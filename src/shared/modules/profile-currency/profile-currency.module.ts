import { NgModule } from '@angular/core';

import { ProfileCurrencyPipe } from './profile-currency.pipe';

@NgModule({
  declarations: [
    ProfileCurrencyPipe,
  ],
  exports: [
    ProfileCurrencyPipe,
  ],
})
export class ProfileCurrencyModule {
}
