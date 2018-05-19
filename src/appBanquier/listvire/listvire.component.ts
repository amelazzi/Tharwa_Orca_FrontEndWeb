import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {Service} from './listvire.service';
import { CustomHttpClient } from '../../CustomHttpClient';

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
    //this.getImageFromService('2');
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
          case 401 :
            this.textFailed ="cette session a expiré vous allez être redirigé vers la page de connexion";
          break;
          case 404 :
            this.textFailed ="Impossible de trouver la ressource demandé";
          break;
          case 500 :
            this.textFailed ="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed ="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
  }

  getImageFromService(id:string) {
    let imageService = new Service(this.httpClient);

    imageService.getImage(id)
    .subscribe(
      (data:Blob) => 
      {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
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
        this.success = true;
        if(status === '0'){
          this.textSuccess = "Virement rejeté avec succès";
        }else {
          this.textSuccess = "Virement validé avec succès";
        }
        this.getVirement();
      }
    ,err => 
    {
      this.success = false;
      switch (err['status'])
        {
          
          case 401 :
            this.textSuccess = "cette session a expiré vous allez être redirigé vers la page de connexion";
            this.router.navigateByUrl('/');
          break;
          case 404 :
            this.textSuccess = "Virement introuvable vérifiez qu'il n'a pas déjà été traité"; 
          break;
          case 500 :
            this.textSuccess ="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textSuccess ="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break;
          
        }
    }
    );
  }
}