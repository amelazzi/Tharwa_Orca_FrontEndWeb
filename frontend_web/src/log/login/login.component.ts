import { Component, OnInit } from '@angular/core';
import { LogComponent } from '../log.component';

import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient:HttpClient,private router: Router) { }
  
  mail:String;
  mdp :String;
  mode : String;
  ngOnInit() {
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
    .subscribe(response => 
      {
        console.log(response);
        localStorage.setItem('blur','true');
        localStorage.setItem('mail',""+this.mail);
        this.router.navigateByUrl('/gestionnaire');
      }
      ,err => {
        if(err["status"]===403)
        {
          alert("E-mail ou mot de passe incorrecte");
        }
        else if (err["status"]>= 500)
        {
          alert("oups il y a un soucis de la prt de notre serveur :'(");
        }
        console.log(err);
      }
    );
  }
}
