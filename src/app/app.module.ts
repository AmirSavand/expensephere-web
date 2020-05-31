import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { ApiService } from '@shared/services/api.service';
import { AuthService } from '@shared/services/auth.service';
import { HttpInterceptorService } from '@shared/services/http-interceptor.service';
import { ProfileService } from '@shared/services/profile.service';
import { WalletService } from '@shared/services/wallet.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoadingBarModule,
    LoadingBarHttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    ApiService,
    AuthService,
    ProfileService,
    WalletService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
