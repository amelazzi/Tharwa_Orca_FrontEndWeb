import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {LogModule} from './log/log.module';
import {AppBanquierModule} from './appBanquier/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}





platformBrowserDynamic().bootstrapModule(LogModule)
  .catch(err => console.log(err));
