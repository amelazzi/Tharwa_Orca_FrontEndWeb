import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profilebanquier',
  templateUrl: './profilebanquier.component.html',
  styleUrls: ['./profilebanquier.component.scss']
})
export class ProfileBanquierComponent implements OnInit {
  
  formCtrl: FormGroup;
  formMdp : FormGroup;

  successGet : boolean;
  textFailed:String = "";
  constructor(private httpClient : HttpClient, private router:Router) 
  { 
  }
  nom:String=" ";
  prenom:String=" ";
  mail:String=" ";
  tel:String=" ";


  ngOnInit() {


    this.formCtrl = new FormGroup({
      mail: new FormControl(''),
      nom : new FormControl(''),
      prenom : new FormControl(''),
      tel : new FormControl(''),
    });
    


    this.formMdp = new FormGroup({
      mdpNewRep: new FormControl(''), // nouveau mot de apsse répété
      mdpNew : new FormControl(''), // nouveau mot de passe 
      mdpOld : new FormControl(''), // ancien mot de passe
    });

    this.getInfoProfile(localStorage.getItem('mail'))
    
    localStorage.setItem('selectedItem','2');
  }






  getInfoProfile(mailId:String)
  {
    var headers = new HttpHeaders();
    headers = headers.append("token",localStorage.getItem('token_access'));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");

    var body ="userId="+mailId+"";
    
    this.httpClient.post('http://192.168.0.196:8080/profil',body,{headers:headers})
    .subscribe(
      data => 
      {
        var nomPrenom : any[];
        console.log(data[0]);
        nomPrenom = data[0]["username"].split(' ',2);
        
        this.nom = nomPrenom[0];
        
        this.prenom  = nomPrenom[1];
        this.mail = data[0]["userId"];
        this.tel = data[0]["numTel"];
      }
      ,err => 
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
    );
  }


  updateProfile(){
    var headers = new HttpHeaders();

    headers = headers.append("token",localStorage.getItem('token_access'));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    
    var body = "";
    this.httpClient.post('',body,{headers:headers})
    .subscribe(
      data =>
      {
         
      }
      ,err => 
      {
         
      }
    )
  }



}
