import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app/app.component';

import { LogComponent} from '../../log/log.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
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

  Deconnexion()
  {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }


}
