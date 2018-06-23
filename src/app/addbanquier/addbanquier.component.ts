import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app/app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import {Service} from './addbanquier.service';
@Component({
  selector: 'app-addbanquier',
  templateUrl: './addbanquier.component.html',
  styleUrls: ['./addbanquier.component.scss']
})
export class AddbanquierComponent implements OnInit {
  mail:String;
  nom:String;
  prenom:String;
  adr:String;
  tel :String ; 
  pass : String;

  show : boolean; // variable qui servira à définir si le mot de passe du banquier en saisi est visible ou non
  iconVisibility : String; // variable qui contient l'icon à afficher selon la visibilité du mot de passe


  
  constructor(private httpClient:HttpClient, private router:Router) { }
  formAddBanquier:FormGroup;
  ngOnInit() {
    localStorage.setItem('selectedItem','5');
    
    this.typeInput = "password" 
    this.show = false;
    this.iconVisibility = "visibility";


    this.formAddBanquier = new FormGroup({
      mail: new FormControl(''),
      nom : new FormControl(''),
      prenom : new FormControl(''),
      tel : new FormControl(''),
      adresse : new FormControl(''),
      file : new FormControl(''),
      pass : new FormControl(''),
    });
  }

  success : boolean;
  textFailed:String ="";
  addBanquier()
  {
    var service = new Service (this.httpClient);
    
    service.addBanquier(this.mail,this.tel,this.nom,this.prenom,this.pass)
    .subscribe(
      data => 
      {
        alert("Le Compte banquier a bien été ajouté");
        this.router.navigateByUrl('/gestionnaire/listbanquier');
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
            this.textFailed="cette session a expiré vous allez être redirigé vers la page de connexion";
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


  typeInput : String;
  showMdp()
  //fonction qui cache ou montre le mot de passe en saisi du banquier
  {
    if(this.show === true)
    {
      this.typeInput = "text"
      this.show = false;
      this.iconVisibility = 'visibility_off';
    }else{
      this.typeInput = "password"
      this.show = true;
      this.iconVisibility = 'visibility'
    }
  }
}
