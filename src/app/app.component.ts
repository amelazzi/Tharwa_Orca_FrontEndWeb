import { NgModule ,Component } from '@angular/core';
import { HttpHeaders , HttpClientModule,HttpClient } from '@angular/common/http';

import { LogComponent } from '../log/log.component';

import { Router } from '@angular/router';

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
    localStorage.setItem('blurGest','true')
//    localStorage.setItem('token_access',"Vk5sdkIaq5fAnhepbrXOndqFtRscTXrVQWPUKX5bjAKsZAI4UJSpEKItNEoBJdsgECrVCHTCOohIozlsuugwnD3wKnRtYOtnZBJ14NGwZH4Ya6TnOpfSWbo5Bxvh4ybjI1385jHklEDfsqoSwLstQv792W7E6ENA3klObi4QrMExjbEPOJUbmUX5j6uwT36MM87zNIjXqOW6c3GKaXGANvQ9HOCaX2eNaDQtySq5iJv5dvUJgnQodrN7GYXVpxq");

  }
}