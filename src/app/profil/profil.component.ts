import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {FormGroup, FormControl, FormControlName} from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  formCtrl: FormGroup;
  formMdp : FormGroup;
  constructor(private httpClient : HttpClient, private router:Router) 
  { 
  }
  nom:String=" ";
  prenom:String=" ";
  mail:String=" ";
  tel:String=" ";

  saveUpdate(){
    var headers = new HttpHeaders();


    headers = headers.append("token",localStorage.getItem('token_access'));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        
  }


  ngOnInit() {

    var appCompo=new AppComponent(this.httpClient, this.router);
    appCompo.route();

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

    var headers = new HttpHeaders();
    headers = headers.append("token",localStorage.getItem('token_access'));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");

    var body ="userId="+localStorage.getItem('mail')+"";
    
    this.httpClient.post('http://127.0.0.1:4400/profil',body,{headers:headers})
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

      }
    );
  localStorage.setItem('selectedItem','2');
    
  }

}
