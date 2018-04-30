import { Component, OnInit } from '@angular/core';
import { AppComponent} from '../../app/app.component';

import { LogComponent} from '../../log/log.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  static displaySide  : string;
  selectedItem : number = 1;


  private test : string;
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