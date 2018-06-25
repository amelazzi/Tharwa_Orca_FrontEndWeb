import { Component, OnInit } from '@angular/core';


import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { Service } from './listbanquier.service';
import { CONST_RESSOURCE } from '../../constante';

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
  
  
  successGet : boolean;
  textFailed: String ="";
  getBanquier()
  {
    var service = new Service(this.httpClient);
    service.getBanquier()
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
        this.successGet = false;
        switch (err['status'])
        {
          case 401 :
            alert(CONST_RESSOURCE["401"]);
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
