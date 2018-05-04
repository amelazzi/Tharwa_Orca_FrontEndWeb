import { Component, OnInit } from '@angular/core';
import {SidebarbanquierComponent} from '../../appBanquier/sidebarbanquier/sidebarbanquier.component';

import { Router } from '@angular/router';


@Component({
  selector: 'app-navbarbanquier',
  templateUrl: './navbarbanquier.component.html',
  styleUrls: ['./navbarbanquier.component.scss']
})
export class NavbarbanquierComponent implements OnInit {

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
    var sidebar = new SidebarbanquierComponent();
    
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
