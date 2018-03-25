import { Component, OnInit } from '@angular/core';
import { LogComponent } from '../log.component';

import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient:HttpClient,private router: Router) { }
  formLog:FormGroup;
  mail:String;
  mdp :String;
  mode : String;
  tel: String;
  ngOnInit() { 

    this.formLog = new FormGroup({
      mail: new FormControl(''),
      pass: new FormControl(''),
    });

    this.mode = "0";
    if(localStorage.getItem('blur')==="false")
    {
      this.router.navigateByUrl('/gestionnaire');
    }
  }



  authentifier( userMail:String, pass:String )
  {
    var headers = new HttpHeaders();
    

    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");

    
    const body="userId=" + userMail + "&Pwd=" + pass + "&code="+this.mode+"";
    
    this.httpClient.post('https://auththarwa.cleverapps.io/oauth/code',body, {headers: headers})
    
    //this.httpClient.post('http://127.0.0.1:8081/oauth/code',body, {headers: headers})
    .subscribe(response => 
      {
        console.log(response);
        localStorage.setItem('blur','true');
        //blur sera utilisé pour savoir si on doit floudifier le fond ou pas

        localStorage.setItem('mail',""+this.mail);
        localStorage.setItem('auth','true'); 
        //auth sera utilisé pour savoir si l'utilisateur s'est authentifier avec succès
        
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
