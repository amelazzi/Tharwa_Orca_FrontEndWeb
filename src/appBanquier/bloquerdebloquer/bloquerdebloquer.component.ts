import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { CONST_UNAUTHORIZED, CONST_NOT_FOUND, CONST_SERVEUR_ERROR, CONST_DELAIDEPASSE, CONST_RESSOURCE } from '../../constante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bloquerdebloquer',
  templateUrl: './bloquerdebloquer.component.html',
  styleUrls: ['./bloquerdebloquer.component.scss']
})
export class BloquerdebloquerComponent implements OnInit {

  constructor(private httpClient:HttpClient, private router:Router) { }
  
  mail:String;
  numCompte:String;
  nom:String;
  monnaie : String;
  adr:String;
  tel :String ; 
  fonction: String;

  success : boolean;
  successRecherche : boolean;
  textFailed : String;
  textSuccess: String;
  formCompte:FormGroup;

  action : String;
  lock:String;
  
  
  ngOnInit() {
    localStorage.setItem('selectedItem','5');

    this.formCompte = new FormGroup({
      mail: new FormControl(''),
      nom : new FormControl(''),
      tel : new FormControl(''),
      fonction : new FormControl(''),
      monnaie : new FormControl(''),
      numCompte : new FormControl(''),
      adr : new FormControl('')
    });
  }

  changerStatutCompte(status:Number)
  { 
    var headers = new HttpHeaders();
    

    if(this.success == true)
    {
      this.success = false ;
    }else 
    {
      this.success = true
    }

    this.httpClient.put('http://192.168.0.164:8080/accounts/reject',{headers:headers})
    .subscribe(
      data =>
      {
        this.success = true;
        this.textSuccess="";
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case CONST_UNAUTHORIZED :
            this.textSuccess = CONST_RESSOURCE["401"];
            this.router.navigateByUrl('/');
          break;
          case CONST_NOT_FOUND :
            this.textSuccess =CONST_RESSOURCE["404"];
          break;
          case CONST_SERVEUR_ERROR :
            this.textSuccess = CONST_RESSOURCE["500"];
          break;
          case CONST_DELAIDEPASSE :
            this.textSuccess =CONST_RESSOURCE["0"];
          break; 
        }
      }
    );
  }

  rechercherCompte()
  {    
    var headers = new HttpHeaders();
    

    if(this.successRecherche == true)
    {
      this.successRecherche = false ;
    }else 
    {
      this.successRecherche = true
    }

    this.action = "Bloquer";
    this.lock = "lock";

    this.httpClient.put('http://192.168.0.164:8080/accounts/reject',{headers:headers})
    .subscribe(
      data =>
      {
        this.successRecherche = true;
      }
      ,err => 
      {
        this.successRecherche = false ;
        
        switch (err['status'])
        {
          case CONST_UNAUTHORIZED :
            this.textFailed = CONST_RESSOURCE["401"];
            this.router.navigateByUrl('/');
          break;
          case CONST_NOT_FOUND :
            this.textFailed =CONST_RESSOURCE["404"];
          break;
          case CONST_SERVEUR_ERROR :
            this.textFailed = CONST_RESSOURCE["500"];
          break;
          case CONST_DELAIDEPASSE :
            this.textFailed =CONST_RESSOURCE["0"];
          break; 
        }
      }
    );


  }
}
