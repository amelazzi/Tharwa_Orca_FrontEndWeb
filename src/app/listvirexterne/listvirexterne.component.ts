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
    var appCompo=new AppComponent(this.httpClient, this.router);
    appCompo.route();
    this.getVireExterne();

  }

  virements :any[];
  getVireExterne()
  {
    var headers = new HttpHeaders();
    headers = headers.append("token",localStorage.getItem('token_access'));

    this.httpClient.get('http://127.0.0.1:4400/virement/liste/externe',{headers:headers})
    .subscribe(
      (data:any[]) =>
      { 
       
        this.virements = data;
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
      
        if (( err['Status']>= 400) && (err['Status']) < 500 )
        {
          alert("cette session a expiré vous allez être redirigé vers la page de connexion");
        }
      }
      
    );
  }
}
