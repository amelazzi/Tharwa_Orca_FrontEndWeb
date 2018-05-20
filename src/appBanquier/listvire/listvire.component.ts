import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {Service} from './listvire.service';
import { CustomHttpClient } from '../../CustomHttpClient';
import { CONST_UNAUTHORIZED, CONST_NOT_FOUND, CONST_SERVEUR_ERROR, CONST_DELAIDEPASSE, CONST_RESSOURCE } from '../../constante';




@Component({
  selector: 'app-listvirexterne',
  templateUrl: './listvire.component.html',
  styleUrls: ['./listvire.component.scss']
})
export class ListvireComponent implements OnInit {

  constructor(private httpClient:HttpClient, private router:Router) { }
  
  virements : any[];
  successGet : boolean; 
  // boolean pour savoir si la requete qui récupère la liste des virement c'est bien passé
  
  success : boolean;
  // boolean pour savoir si la requete qui traite un virement c'est bien passé

  textFailed :String =""
  //txte qui affiche si un problème est survenu lors de la requête de récupèration des virements

  textSuccess : String="";
  //texte qui affiche le résultat de la requete qui traite un virement
  ngOnInit() {
    
    this.getVirement();
    
    localStorage.setItem('selectedItem','3');
    localStorage.setItem('blur','false');
  }

  Virement = 
    {
      'Code' : 'String',
      'BanqueDestinataire' : 'String',
      'BanqueEmmeteur' : 'String',
      'CompteEmmetteur' : 'String',
      'CompteDestinataire' : 'String',
      'Date' : 'String',
      'IdCommission' : 'String',
      'Justificatif' : 'String',
      'Montant' : 'int',
      'Motif' : 'String',
      'NomEmetteur' : 'String',
      'NomDestinataire' : 'String',
      'NumOrdreVirement' : 'int',
    };
  
  //fonction qui récupère la liste des virement non-traites
  getVirement()
  {
    let service = new Service(this.httpClient)    
    service.getVirement()
    .subscribe(
      (data:any[]) =>
      { 
        this.virements = data["virements"];
        console.log(this.virements);
      }
      ,err =>
      {
        this.successGet = false;
        console.log(err);
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

  //fonction qui renvoie les informations d'un virement
  getVirementInfo(codeVire : String)
  {
    var i = 0 ;
    while (this.virements[i]["Code"] != codeVire )
    {
      i=i+1;
    }
    this.Virement = this.virements[i];
    this.getImageFromService(this.Virement["Code"]);
  }

  
  imageToShow: any;

  //fonction qui constuire une structure blob ou sera accueillie une image
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
  }


  //fonction qui lance le service qui récupère l'image de justificatif du backend
  getImageFromService(id:string) {
    let imageService = new Service(this.httpClient);

    imageService.getImage(id)
    .subscribe(
      (data:Blob) => 
      {
        this.createImageFromBlob(data);
    }, error => {
      switch (error['status'])
      {
        case CONST_UNAUTHORIZED :
          alert(CONST_RESSOURCE["401"]);
          this.router.navigateByUrl('/');
        break;
        case CONST_NOT_FOUND :
          alert(CONST_RESSOURCE["404"]); 
        break;
        case CONST_SERVEUR_ERROR :
          alert(CONST_RESSOURCE["500"]);
        break;
        case CONST_DELAIDEPASSE :
          alert(CONST_RESSOURCE["0"]);
        break;
      }      
    });
  }



  //fonction qui valide ou rejette un virement
  valider(codeVire:string,status : string)
  {
    let service=new Service(this.httpClient); 
    service.valider(codeVire,status)
    .subscribe(
      data =>
      {
        ////////////////////////a chercher : comment lire un ficheir json , close a modal programmaticaly
        this.success = true;
        if(status === '0'){
          this.textSuccess = CONST_RESSOURCE["virementValide"];
        }else {
          this.textSuccess = CONST_RESSOURCE["virementNonValide"];
        }
        this.getVirement();
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
            this.textSuccess = CONST_RESSOURCE["404"]; 
          break;
          case CONST_SERVEUR_ERROR :
            this.textSuccess =CONST_RESSOURCE["500"];
          break;
          case CONST_DELAIDEPASSE :
            this.textSuccess =CONST_RESSOURCE["0"];
          break;
        }
    }
    );
  }
}