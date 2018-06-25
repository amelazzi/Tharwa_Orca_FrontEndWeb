import { Component, OnInit } from '@angular/core';
import { LogComponent } from '../log.component';

import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { CONST_URL } from '../../constante';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient:HttpClient,private router: Router) { }
  formLog:FormGroup; //formulaire de login
  mail:String;
  mdp :String; // mot de apsse
  mode : String; //mode d'envoi du code de validation
  tel: String; 
  ngOnInit() { 

    this.formLog = new FormGroup({
      mail: new FormControl(''),
      pass: new FormControl(''),
    });
    localStorage.clear();
    localStorage.setItem('blur','true');
    localStorage.setItem('blurGest','true');
    this.mode = "0";
  }



  authentifier( userMail:String, pass:String )
  {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    const body="userId=" + userMail + "&Pwd=" + pass + "&code="+this.mode+"";
    
    this.httpClient.post('http://'+CONST_URL+':8081/oauth/code',body, {headers: headers})
    .subscribe(response => 
      {
        console.log(response);
        
        
        //blur sera utilisé pour savoir si on doit floudifier le fond ou pas

        localStorage.setItem('mail',""+this.mail);
        localStorage.setItem('mode',""+this.mode+"");
        localStorage.setItem('blur','true');
        localStorage.setItem('blurGest','true');
        if ( response["type"] === 0)
        {
        
          this.router.navigateByUrl('/gestionnaire');
        }
        else if (response["type"] === 1)
        {
          this.router.navigateByUrl('/banquier');
        }
      }
      ,err => {
        if ( (err["status"]===403) || (err["status"] === 409) )
        {
          alert("E-mail ou mot de passe incorrecte");
        }
        else if (err["status"]>= 500)
        {
          alert("oups il y a un soucis de la part de notre serveur :'(");
        }
        this.tel = "";
        console.log(err);
      }
    );
  }
}
