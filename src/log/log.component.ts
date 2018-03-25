import { Component } from '@angular/core';

 
import { AppModule } from '../app/app.module';
import { AppBanquierModule } from '../appBanquier/app.module';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@Component({
  selector: 'log-root',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent {
  title = 'app';
  constructor(){}
  static blur : boolean;
  ngOnInit(){
   
  }


}
