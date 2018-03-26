import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { ChartistModule } from 'ng-chartist';
import { AppComponent} from '../../app/app.component';
import { Router } from '@angular/router';


import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  code=[];
  constructor(private httpClient:HttpClient, private router: Router) {}
  selectedTab : number;
  displayBlur : String;
  userId : String;
  ngOnInit() 
  {
    var appCompo=new AppComponent(this.httpClient, this.router);
    this.userId = localStorage.getItem('mail');
    
    localStorage.setItem('selectedItem','1');
    if(localStorage.getItem('blur') === "false")
    {
      //appCompo.verifToken();
      this.displayBlur = "none";
    }

  }
  
  tryDeleteBlur()
  {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("Authorization","Basic Y2xpZW50d2ViOm9yY2FAMjAxOA==");
    

    var codeEnvoi = this.code[0] + "" + this.code[1]+""+this.code[2]+""+this.code[3]+""; // code à envoyer
    var  body = "grant_type=password&username="+localStorage.getItem('mail')+"&password="+codeEnvoi+"";

    

    //on envoie la requete au service pour vérifier le code
    this.httpClient.post('https://auththarwa.cleverapps.io/oauth/login',body,{headers:headers})
    .subscribe(responseToken =>
      //reponse donné par le serveur après avoir valider le code, elle contient l'access token
      {
        console.log(responseToken);


        localStorage.setItem('token_access',responseToken["access_token"]);
        localStorage.setItem('refresh',responseToken["refresh_token"]);

        var headers = new HttpHeaders();
        headers = headers.append("token",localStorage.getItem('token_access'));

        //on envoie la requete pour vérifier le token reçu au service app
        this.httpClient.get('http://api-tharwaa.cleverapps.io/users/dashBoard',{headers : headers})
        .subscribe(response =>  
          {
            // si le code est valide
            localStorage.setItem('mail',response["userId"]);
            
            this.deleteBlur();
            
          }
          ,err =>
          {
            console.log(err);
            localStorage.clear();
            alert("erreur :"+err['Status']+" la validation à échoué");
          }
        );

      }
    ,err =>
    {
      if((err["status"] === 403) || (err["status"] === 409)){
        alert("le code entré est érroné");
      }
      else if (err["status"]>=  500)
      {
        alert("oups une erreur sur notre serveur est survenue ! veuillez réessayer dans un instant");
      }
    });


  }

  deleteBlur()
  {
    localStorage.setItem('blur','false');
    this.displayBlur = "none";
  }


  getBlurState()
  {
    if (localStorage.getItem('blur')==='true'){
      return true; 
    }
    else
    {
      return false;
    }
  }


}