import { Component, OnInit } from '@angular/core';

import { AppComponent} from '../../app/app.component';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listbanque',
  templateUrl: './listbanque.component.html',
  styleUrls: ['./listbanque.component.scss']
})
export class ListbanqueComponent implements OnInit {
  
  constructor(private httpClient:HttpClient, private router:Router) 
  {
    
  }
  
  ngOnInit() 
  {
    
    localStorage.setItem('selectedItem','6');
    this.getBanque();
  }
  banques :any[];
  getBanque()
  {
    var headers = new HttpHeaders();
    
    headers = headers.append("token","Vk5sdkIaq5fAnhepbrXOndqFtRscTXrVQWPUKX5bjAKsZAI4UJSpEKItNEoBJdsgECrVCHTCOohIozlsuugwnD3wKnRtYOtnZBJ14NGwZH4Ya6TnOpfSWbo5Bxvh4ybjI1385jHklEDfsqoSwLstQv792W7E6ENA3klObi4QrMExjbEPOJUbmUX5j6uwT36MM87zNIjXqOW6c3GKaXGANvQ9HOCaX2eNaDQtySq5iJv5dvUJgnQodrN7GYXVpxq");
    //headers = headers.append("token",localStorage.getItem('token_access'));

    //this.httpClient.get('http://api-tharwaa.cleverapps.io/gestionnaire/listBanque',{headers:headers})
    this.httpClient.get('http://192.168.0.164:8080/gestionnaire/listBanque',{headers:headers})
    .subscribe(
      (data:any[]) =>
      { 
        
        this.banques = data["Banques"];
      }, err =>
      {
        switch (err['status'])
        {
          case 401 :
            alert("cette session a expiré vous allez être redirigé vers la page de connexion");
            this.router.navigateByUrl('/');
          break;
          case 500 :
            alert("Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement");
          break;
          case 0 :
            alert("Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet");
          break;
          
        }
      }
    )
  }
  

}
