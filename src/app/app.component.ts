import { NgModule ,Component } from '@angular/core';
import { HttpHeaders , HttpClientModule,HttpClient } from '@angular/common/http';

import { LogComponent } from '../log/log.component';

import { Router } from '@angular/router';


import * as $ from 'jquery';
@Component(
  {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
}
)
export class AppComponent {
  
  
  title = 'app';
  constructor(private httpClient:HttpClient, private router: Router){}
  

  public route() 
//la fonction vérifie si le code à été entré si ce n'est pas le cas l'utilisateur est renvoyé à la page du code
  {
    if (localStorage.getItem('blur') != 'false')
    {
      this.router.navigateByUrl('gestionnaire');
    }
  }


  ngOnInit()
  {


  $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }
}