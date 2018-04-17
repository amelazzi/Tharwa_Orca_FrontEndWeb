import { Component, OnInit } from '@angular/core';


import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listbanquier',
  templateUrl: './listbanquier.component.html',
  styleUrls: ['./listbanquier.component.scss']
})
export class ListbanquierComponent implements OnInit {

  constructor(private httpClient:HttpClient, private router : Router) { }

  ngOnInit() 
  {
    
    localStorage.setItem('selectedItem','4');
    
    
    this.getBanquier();
  }
  banquiers :any[];
  
  
  getBanquier()
  {
    var headers = new HttpHeaders();
    headers = headers.append("token",localStorage.getItem('token_access'));
    //headers = headers.append("token","Vk5sdkIaq5fAnhepbrXOndqFtRscTXrVQWPUKX5bjAKsZAI4UJSpEKItNEoBJdsgECrVCHTCOohIozlsuugwnD3wKnRtYOtnZBJ14NGwZH4Ya6TnOpfSWbo5Bxvh4ybjI1385jHklEDfsqoSwLstQv792W7E6ENA3klObi4QrMExjbEPOJUbmUX5j6uwT36MM87zNIjXqOW6c3GKaXGANvQ9HOCaX2eNaDQtySq5iJv5dvUJgnQodrN7GYXVpxq");
    //this.httpClient.get('http://api-tharwaa.cleverapps.io/gestionnaire/listBanquiers',{headers:headers})
    this.httpClient.get('http://192.168.0.164:8080/gestionnaire/listBanquiers',{headers:headers})
    .subscribe(
      (data:any[]) =>
      {
        var nomPrenom;
        this.banquiers = data["Banquiers"];

        var i = 0;
        while (this.banquiers[i] != null )
        {
          nomPrenom = this.banquiers[i]["username"].split(" ",2);
          this.banquiers[i]["nom"] = nomPrenom[0];
          this.banquiers[i]["prenom"] = nomPrenom[1]; 
          i=i+1;
        }
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
