import { Component, OnInit } from '@angular/core';

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
    this.selectedItem = 1 ;
  }

  getBlurState()
  {
    if (localStorage.getItem('blur')==='true')
    {
      return true; 
    }
    else
    {
      return false;
    }
  }
}
