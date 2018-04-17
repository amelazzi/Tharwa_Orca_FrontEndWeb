import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app/app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
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
  constructor(private httpClient:HttpClient, private router:Router) { }
  formAddBanquier:FormGroup;
  ngOnInit() {
    localStorage.setItem('selectedItem','5');


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


  addBanquier()
  {
    var headers = new HttpHeaders();
    
    headers = headers.append("token",""+localStorage.getItem('token_access')+"");
    
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    
    var body="userId="+this.mail+"&Tel="+this.tel+"&UserName="+this.nom+" "+this.prenom+"+&Pwd="+this.pass+"";
    this.httpClient.post("http://192.168.0.164:8080/users/BankerInscription",body,{headers:headers})
    //this.httpClient.post("http://api-tharwaa.cleverapps.io/users/BankerInscription",body,{headers:headers})
    .subscribe(
      data => 
      {
        alert("Le Compte banquier a bien été ajouté");
      }
      ,err => 
      {
        switch (err['status'])
        {
          case 401 :
            alert("cette session a expiré vous allez être redirigé vers la page de connexion");
          break;
          case 500 :
            alert("Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement");
          break;
          case 0 :
            alert("Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet");
          break; 
        }
      }
    );
  }
}
