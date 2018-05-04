import { Component, OnInit } from '@angular/core';
import { AppBanquierComponent} from '../../appBanquier/appBanquier.component';

import { LogComponent} from '../../log/log.component';

@Component({
  selector: 'app-sidebarbanquier',
  templateUrl: './sidebarbanquier.component.html',
  styleUrls: ['./sidebarbanquier.component.scss']
})
export class SidebarbanquierComponent implements OnInit {

  constructor() { }
  static displaySide  : string;
  selectedItem : number = 1;

  ngOnInit()
  {
    localStorage.setItem('blurGest','false');
  }


  public setDisplay(on : string)
  {
    localStorage.setItem('displaySidebar',on);
  }

  getDisplay()
  {
    return localStorage.getItem('displaySidebar');
  }


  getBlurState()
  {
    if (localStorage.getItem('blurGest')==='true')
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  getSelectedItem():number
  {
    return parseInt(localStorage.getItem('selectedItem'));
  }

}