import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { ChartistModule } from 'ng-chartist';
import { AppComponent} from '../../app/app.component';
import { Router } from '@angular/router';

import {NgStyle} from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './homeBanquier.component.html',
  styleUrls: ['./homeBanquier.component.scss']
})
export class HomeBanquierComponent implements OnInit {

  code=[];
  constructor(private httpClient:HttpClient, private router: Router) {}
  selectedTab : number = 1;
  displayBlur : String;
  userId : String;
  mode : String ; // mode d'envoie du code de validation

  ngOnInit() 
  {
    var appCompo=new AppComponent(this.httpClient, this.router);
    this.userId = localStorage.getItem('mail');
    localStorage.setItem('selectedItem','1');
    //si on est dans un etat ou le user a entré un bon code on vérifie l'access_token qu'on a
    if(localStorage.getItem('blur') === "false")
    {
      this.displayBlur = "none";
      this.getCompte();
    }
    
    if(localStorage.getItem('') === '0' )
    {
      this.mode = "email"
    }
    else if (localStorage.getItem('') === '1')
    {
      this.mode = "telephone"
    }
  }


  comptes : any[];
  // récupère la liste des comptes avec etat = 0 ( en attente de validation)
  getCompte()
  {
    var headers = new HttpHeaders();
    headers = headers.append("token","1g1CMMMZydA4YT3GWHTiC9d5PjdxsD7Z8nL6jNdpBzOJYSOj6LC0ZWUslHxeuDXmPh6MPRDiSUxY2L9ZBay4JirDlTxwVZcGbmdwAftaKK6B5DbDZMCbLRATjCDTwxcRb1bXVzqLSCeWdpym0eJ61bgxNpI3FkFQZPVEwa7hOFCklxNgXoFR7F6X5GHSkA0bupdCo5hzji8khXIz4ly8fyC3mq3FgcOu8Ogfhw9nGxt1r72V2PGy4EI3Tt0SiQr");
    this.httpClient.get('http://api-tharwaa.cleverapps.io/accounts/compteNonValide',{headers:headers})
    .subscribe(
      (data:any[]) =>
      { 
        var typecompte = ["Courant", "Epargne","Devise Euro", "Devise Dollar"];
        this.comptes = data["Comptes"];
        var i = 0 ; 
        while (i < this.comptes.length) 
        {
          if(this.comptes[i]["Etat"] === 0 )
          {
            this.comptes[i]["iconLock"] = "lock_outline";
          }
          else
          {
            this.comptes[i]["iconLock"] = "lock_open";
          }
          
          this.comptes[i]["TypeCompte"] = typecompte[ this.comptes[i]["TypeCompte"] ];
          i=i+1;
        }
      }, err =>
      {
        if (( err['Status']>= 400) && (err['Status']) < 500 )
        {
          alert("cette session a expiré vous allez être redirigé vers la page de connexion");
        }
      }
    )
  }


  nomClient : String = " ";
  photo : String = '';
  adresseClient : String = '';
  numTel : String = '';
  fonction : String = '';
  mail : String = '';
  numCompte : String = " ";
  monnaie : String = " ";
  balance : String = " ";
  typeCompte : String = " ";
  client:any;

//recupere les infos du compte choisit et de son utilisateur.
  voirInfoCompte(IdUser:String)
  {
    var i = 0;
    
    while (this.comptes[i]["IdUser"] != IdUser )
    {
      i=i+1;
    }
    //on recupere les paramètres du compte selectionné
    this.mail = this.comptes[i]["IdUser"];
    this.client =  this.comptes[i]["Client"];
    this.nomClient = this.client["Nom"] + "  " + this.client["Prenom"];
    this.adresseClient = this.client["Adresse"];
    this.numTel = "0549018080"; // en attendant d'avoir un num tel à partir du service back
    this.numCompte = this.comptes[i]["Num"];
    this.photo = "../assets/img/avatars/" +this.client["Photo"];
    this.fonction = this.client["Fonction"];
    this.balance = this.comptes[i]["Balance"];
    this.monnaie = this.comptes[i]["CodeMonnaie"];
    this.typeCompte = this.comptes[i]["TypeCompte"];
  } 


  valider()
  {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("token","1g1CMMMZydA4YT3GWHTiC9d5PjdxsD7Z8nL6jNdpBzOJYSOj6LC0ZWUslHxeuDXmPh6MPRDiSUxY2L9ZBay4JirDlTxwVZcGbmdwAftaKK6B5DbDZMCbLRATjCDTwxcRb1bXVzqLSCeWdpym0eJ61bgxNpI3FkFQZPVEwa7hOFCklxNgXoFR7F6X5GHSkA0bupdCo5hzji8khXIz4ly8fyC3mq3FgcOu8Ogfhw9nGxt1r72V2PGy4EI3Tt0SiQr");

    var body = "num="+this.numCompte+"";
    this.httpClient.put('http://api-tharwaa.cleverapps.io/accounts/validate',body,{headers:headers})
    .subscribe(
    data =>
    {
      alert();
      this.getCompte();
    }
    );
  }

// fonction qui envoie le code entré
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
            this.getCompte();
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
      }else if (err["status"]>=  500)
      {
        alert("oups une erreur sur notre serveur est survenue ! veuillez réessayer dans un instant");
      }
    });
  }





// fonction qui supprime la floudification de l'écran
  deleteBlur()
  {
    localStorage.setItem('blur','false');
    this.displayBlur = "none";
  }



//fonction qui récupere l'état de la floudification util pour savoir 
//à tout moment si on est dans un etat ou le user a entrée un bon code ou pas
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


}