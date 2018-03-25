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
  selectedItem : number = 1;
  ngOnInit() 
  {
    
  }

  getBlurState()
  {
    if (localStorage.getItem('blur')==='true'){
      
      return true;

    }else
    {
      return false;
    }
  }

  getSelectedItem():number
  {
    return parseInt(localStorage.getItem('selectedItem'));
  }

}
