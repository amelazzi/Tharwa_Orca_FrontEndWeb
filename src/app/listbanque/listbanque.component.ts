import { Component, OnInit } from '@angular/core';

import { AppComponent} from '../../app/app.component';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service} from './listBanque.service'; 


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


  success : boolean;

  successGet: boolean;

  textFailed : String = "";

  textSuccess : String = "";

  
  banque = 
    {
      'code' : 'String',
      'raisonSociale' : 'String',
      'adresse' : 'String',
      'mail' : 'String'
    };
  
  getBanque()
  {
    var service = new Service(this.httpClient)
    service.getBanque()
    .subscribe(
      (data:any[]) =>
      { 
        this.banques = data["Banques"];
      }, err =>
      {
        this.successGet = false;
        switch (err['status'])
        {
          
          case 401 :
            this.textFailed ="cette session a expiré vous allez être redirigé vers la page de connexion";
            this.router.navigateByUrl('/');
          break;
          case 500 :
            this.textFailed ="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed ="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break;
          
        }
      }
    )
  }
  

}
