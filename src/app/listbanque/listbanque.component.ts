import { Component, OnInit } from '@angular/core';

import { AppComponent} from '../../app/app.component';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service} from './listBanque.service'; 
import { CONST_UNAUTHORIZED, CONST_RESSOURCE, CONST_NOT_FOUND, CONST_SERVEUR_ERROR, CONST_DELAIDEPASSE } from '../../constante';
import 'bootstrap'; 
import * as $ from 'jquery'; // sera utilisé pour fermer le modal qui s'ouvre facilement
import { FormGroup, FormControl } from '@angular/forms';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-listbanque',
  templateUrl: './listbanque.component.html',
  styleUrls: ['./listbanque.component.scss']
})
export class ListbanqueComponent implements OnInit {
  
  constructor(private httpClient:HttpClient, private router:Router) 
  {
    
  }
  formBanque:FormGroup;
  ngOnInit() 
  {
    localStorage.setItem('selectedItem','6');
    this.getBanque();

    this.formBanque = new FormGroup({
      mail: new FormControl(''),
      code : new FormControl(''),
      raison : new FormControl(''),
      adresse : new FormControl(''),
    });
    this.banque['RaisonSocial']= " ";
  }
  banques :any[];



  success : boolean;

  successGet: boolean;

  textFailed : String = "";

  textSuccess : String = "";

  
  banque = 
    {
      'Code' : 'String',
      'RaisonSociale' : 'String',
      'Adresse' : 'String',
      'Mail' : 'String'
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
            case CONST_UNAUTHORIZED :
              alert(CONST_RESSOURCE["401"]);
              this.router.navigateByUrl('/');
            break;
            case CONST_NOT_FOUND :
              this.textFailed = CONST_RESSOURCE["404"]; 
            break;
            case CONST_SERVEUR_ERROR :
              this.textFailed =CONST_RESSOURCE["500"];
            break;
            case CONST_DELAIDEPASSE :
            
              this.textFailed =CONST_RESSOURCE["0"];
            break;
          
        }
      }
    )
  }


  codeBanqueDelete :String;
  getBanqueId(code:String){
    this.codeBanqueDelete = code
  }


  successDelete :boolean;
  textDelete : String;



  deleteBanque(){
    this.successDelete = null;

    var service = new Service(this.httpClient)
    service.deleteBanque(this.codeBanqueDelete)
    .subscribe(
      data =>{

        this.getBanque();
        $("#warning .close").click(); // fermer le modal
        $("#warningBack .close").click(); // fermer l'arrièreplan (gris) du modal
        
      }, err =>
      {
        this.successDelete = false;
        switch (err['status'])
          {
            case CONST_UNAUTHORIZED :
              alert(CONST_RESSOURCE["401"]);
              this.router.navigateByUrl('/');
            break;
            case CONST_NOT_FOUND :
              this.textDelete = CONST_RESSOURCE["404"]; 
            break;
            case CONST_SERVEUR_ERROR :
              this.textDelete =CONST_RESSOURCE["500"];
            break;
            case CONST_DELAIDEPASSE :
              this.textDelete =CONST_RESSOURCE["0"];
            break;
          }
      }
    );
  }

  getBanqueInfo(bank:JSON){
    this.success = null;
    this.banque['Code'] = bank['Code']; 
    this.banque['Adresse'] = bank['Adresse']; 
    this.banque['Mail'] = bank['Mail']; 
    this.banque['RaisonSocial'] = bank['RaisonSocial'];  
  }

  updateBanque(){
    this.success = null
    var service = new Service(this.httpClient)
    service.updateBanque(this.banque)
    .subscribe(
      data =>{

        this.getBanque();
        $("#info .close").click(); // fermer le modal
        $("#infoBack .close").click(); // fermer l'arrièreplan (gris) du modal
        this.success = null;
      }, err =>
      {
        this.success= false;
        switch (err['status'])
          {
            case CONST_UNAUTHORIZED :
              alert(CONST_RESSOURCE["401"]);
              this.router.navigateByUrl('/');
            break;
            case CONST_NOT_FOUND :
              this.textSuccess= CONST_RESSOURCE["404"]; 
            break;
            case CONST_SERVEUR_ERROR :
              this.textSuccess =CONST_RESSOURCE["500"];
            break;
            case CONST_DELAIDEPASSE :
            alert(err['status']);
              this.textSuccess =CONST_RESSOURCE["0"];
            break;
          }
      }
    );
  }
  

}
