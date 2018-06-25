import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, FormControlName} from '@angular/forms';
import { Router } from '@angular/router';
import { CONST_UNAUTHORIZED, CONST_URL } from '../../constante';


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
    

    var body ="userId="+mailId+"";
    
    this.httpClient.get('http://'+CONST_URL+':8088/profil',{headers:headers})
    .subscribe(
      data => 
      {
        var nomPrenom : any[];
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
            alert(CONST_UNAUTHORIZED["401"]);
            this.router.navigateByUrl('/');
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

  mdpOld:String;
  mdpNew:String;
  changerMDP(){
    var headers = new HttpHeaders();
    headers = headers.append("token",localStorage.getItem('token_access'));
    

    var body ={
      'old':this.mdpOld,
      'new':this.mdpNew
    }
    
    this.httpClient.post('http://'+CONST_URL+':8088/clients/info',body,{headers:headers})
    .subscribe(
      data => 
      {
        
      }
      ,err => 
      {
        this.successGet = false;
        switch (err['status'])
        {
          case 401 :
            alert(CONST_UNAUTHORIZED["401"]);
            this.router.navigateByUrl('/');
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






}
