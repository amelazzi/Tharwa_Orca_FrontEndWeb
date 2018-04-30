import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listvirexterne',
  templateUrl: './listvirexterne.component.html',
  styleUrls: ['./listvirexterne.component.scss']
})
export class ListvirexterneComponent implements OnInit {

  constructor(private httpClient : HttpClient, private router:Router) { }

  ngOnInit() {
    localStorage.setItem('selectedItem','3');
    
    localStorage.setItem('blurGest','false');

    this.getVireExterne();

  }

  virements :any[];
  getVireExterne()
  {
    var headers = new HttpHeaders();
    headers = headers.append("token",localStorage.getItem('token_access'));

    
    this.httpClient.get('http://192.168.0.164:8080/gestionnaire/listVirementEx',{headers:headers})
    .subscribe(
      (data:any[]) =>
      { 
       
        this.virements = data["Virements"];
        var i = 0 ;
        while (this.virements[i] != null)
        {
          switch (this.virements[i]["Statut"])
          {
            case "0":
                this.virements[i]["Statut"] = "rejeté";
            break;
            case "1":
                this.virements[i]["Statut"] = "validé";
            break;
            case null:
                this.virements[i]["Statut"] = "en cours de traitement";
            break;
          }
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
           // alert("Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet");
          break; 
        }
      }
      
    );
  }
}
