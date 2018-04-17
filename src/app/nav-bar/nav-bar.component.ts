import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app/app.component';
import {SidebarComponent} from '../../app/sidebar/sidebar.component';


import { LogComponent} from '../../log/log.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  display : string;

  ngOnInit() {
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

  Deconnexion()
  {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }


  showMenu()
  {
    var sidebar = new SidebarComponent();
    
    if(localStorage.getItem('displaySidebar') === 'table')
    {
      sidebar.setDisplay("none");
    }
    else
    {
      sidebar.setDisplay('table') ;
    }
  }


}
