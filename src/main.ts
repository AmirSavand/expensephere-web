import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@environments/environment';

if (!environment.development) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch((error: Error): void => console.error(error));
