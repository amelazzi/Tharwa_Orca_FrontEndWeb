import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { CONST_UNAUTHORIZED, CONST_NOT_FOUND, CONST_SERVEUR_ERROR, CONST_DELAIDEPASSE, CONST_RESSOURCE, CONST_URL } from '../../constante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bloquerdebloquer',
  templateUrl: './bloquerdebloquer.component.html',
  styleUrls: ['./bloquerdebloquer.component.scss']
})
export class BloquerdebloquerComponent implements OnInit {

  constructor(private httpClient:HttpClient, private router:Router) { }
  
  mail:String=" ";
  numCompte:String= " ";
  monnaie : String;
  balance : number=0;
  status : number;
  motif :String;

  success : boolean;
  successRecherche : boolean;
  textFailed : String; 
  textSuccess: String;
  formCompte:FormGroup;
  formBanque : FormGroup;
  action : String;
  actionUrl: String;
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

    this.formBanque = new FormGroup({
      motif: new FormControl(''),
    });
  }

  changerStatutCompte()
  { 
    var headers = new HttpHeaders();

  
    if (this.status === 1){
      this.actionUrl = "bloc";
    }else if (this.status === 3){
      this.actionUrl = "debloc";
    }
    this.success = null;
    var body ={
      'num' : this.numCompte,
      'motif': this.motif
    }
    
    // token vers le PC de nwel pour tester le reste

    headers = headers.append('token',localStorage.getItem('token_access'));
    this.httpClient.put('http://'+CONST_URL+':8080/accounts/'+this.actionUrl+'',body,{headers:headers})
    .subscribe(
      data =>
      {
        this.success = true;
        alert('Compte '+this.action+ 'avec succès');
        this.rechercherCompte();
        
      }
      ,err => 
      {
        this.success = false;
        switch (err['status']) 
        {
          case CONST_UNAUTHORIZED :
            alert(CONST_RESSOURCE["401"]);
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

  search = "";
  
  rechercherCompte()
  {    
    var headers = new HttpHeaders();
    
    this.success = null;
    
    
    headers = headers.append('token',localStorage.getItem('token_access'));
    
    this.httpClient.get('http://'+CONST_URL+':8080/gestionnaire/infoCompte?Num='+this.search+'',{headers:headers})
    .subscribe(
      data =>
      {
        this.monnaie = data["compte"]["CodeMonnaie"];
        
        this.numCompte = data["compte"]["Num"];
        this.status = data["compte"]["Etat"];
        this.balance = data["compte"]["Balance"]
        this.mail = data["compte"]["IdUser"];
        
        if(this.status === 1){
          this.action = "Bloquer"
          this.lock = "lock"
        }else if (this.status === 3){
          this.action = "Débloquer";
          this.lock = "lock_open"
        }
        this.successRecherche = true;
      }
      ,err => 
      {
        this.successRecherche = false ;
        
        switch (err['status'])
        {
          case CONST_UNAUTHORIZED :
            alert(CONST_RESSOURCE["401"]);
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
