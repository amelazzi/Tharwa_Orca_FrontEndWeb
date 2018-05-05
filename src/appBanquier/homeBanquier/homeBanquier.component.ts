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


    localStorage.setItem('blur','false');


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

  successGet : boolean;
  textFailed:String = "";
  comptes : any[];
  // récupère la liste des comptes avec etat = 0 ( en attente de validation)
  getCompte()
  {
    var headers = new HttpHeaders();
    headers = headers.append("token", localStorage.getItem('token_access'));
    
    this.httpClient.get('http://192.168.101.1:8080/accounts/compteNonValide',{headers:headers})
    
    .subscribe(
      (data:any[]) =>
      {
        this.successGet = true;
        var typecompte = ["Courant", "Epargne","Devise Euro", "Devise Dollar"];
        this.comptes = data["Comptes"];
        var i = 0 ; 
        while (i < this.comptes.length) 
        {
          this.comptes[i]["TypeCompte"] = typecompte[ this.comptes[i]["TypeCompte"] ];
          i=i+1;
        }
      }, err =>
      {
        this.successGet = false;
        switch (err['status'])
        {
          case 401 :
            this.textFailed ="cette session a expiré vous allez être redirigé vers la page de connexion";
          break;
          case 500 :
            this.textFailed="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break;
          
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
   
    this.fonction = this.client["Fonction"];
    
    this.monnaie = this.comptes[i]["CodeMonnaie"];
    this.typeCompte = this.comptes[i]["TypeCompte"];
  } 


  textSuccess : String = "";
  success : boolean;
  //fonction pour valider un compte nouvellement créé
  valider()
  {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("token", localStorage.getItem('token_access'));
    var body = "num="+this.numCompte+"";

    //this.httpClient.put('http://api-tharwaa.cleverapps.io/accounts/validate',body,{headers:headers})
    this.httpClient.put('http://192.168.0.164:8080/accounts/validate',body,{headers:headers})
    .subscribe(
      data =>
      {
        this.textSuccess="Compte validé avec succès";
        this.success = true;
        this.getCompte();
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
            this.textSuccess="Cette session a expiré vous allez être redirigé vers la page de connexion";
          break;
          case 404 :
            this.textSuccess="Compte introuvable vérifiez qu'il n'a pas déjà été traité"; 
          break;
          case 500 :
            this.textSuccess="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textSuccess="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break; 
        }
      }
    );
  }

  //fonction pour rejeter un compte nouvellement créé
  bloquer()
  {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("token", localStorage.getItem('token_access'));
    var body = "num="+this.numCompte+"";

    //this.httpClient.put('http://api-tharwaa.cleverapps.io/accounts/validate',body,{headers:headers})
    this.httpClient.put('http://192.168.0.164:8080/accounts/reject',body,{headers:headers})
    .subscribe(
      data =>
      {
        this.success = true;
        this.textSuccess="Compte rejeté avec succès";
        this.getCompte();
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
            this.textSuccess="cette session a expiré vous allez être redirigé vers la page de connexion";
          break;
          case 404 :
            this.textSuccess="Compte introuvable vérifiez qu'il n'a pas déjà été traité"; 
          break;
          case 500 :
            this.textSuccess="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textSuccess="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break; 
        }
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

    

    //on envoie la requete au service pour vérifier le code a 4 chiffres
    //this.httpClient.post('https://auththarwa.cleverapps.io/oauth/login',body,{headers:headers})
    this.httpClient.post('http://192.168.0.164:8081/oauth/login',body,{headers:headers})
    .subscribe(responseToken =>
      //reponse donné par le serveur après avoir valider le code, elle contient l'access token
      {
        console.log(responseToken);

        localStorage.setItem('token_access',responseToken["access_token"]);
        localStorage.setItem('refresh',responseToken["refresh_token"]);

        var headers = new HttpHeaders();
        headers = headers.append("token",localStorage.getItem('token_access'));

        //on envoie la requete pour vérifier le token reçu au service app
        this.httpClient.get('http://192.168.0.164:8080/users/dashBoard',{headers : headers})
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
      switch (err['status'])
        {
          case 401 :
            alert("cette session a expiré vous allez être redirigé vers la page de connexion");
            this.router.navigateByUrl('/');
          break;
          case 404 :
            alert("Utilisateur non trouvé");
          break;
          case 500 :
            alert("Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement");
          break;
          case 0 :
            alert("Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet");
          break; 
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
