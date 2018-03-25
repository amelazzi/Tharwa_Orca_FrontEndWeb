import { Component, OnInit } from '@angular/core';


import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listbanquier',
  templateUrl: './listbanquier.component.html',
  styleUrls: ['./listbanquier.component.scss']
})
export class ListbanquierComponent implements OnInit {

  constructor(private httpClient:HttpClient, private router : Router) { }

  ngOnInit() 
  {
    
    localStorage.setItem('selectedItem','4');
    var appCompo=new AppComponent(this.httpClient, this.router);
    appCompo.route();
    
    
    this.getBanquier();
  }
  banquiers :any[];
  
  
  getBanquier()
  {
    var headers = new HttpHeaders();
    headers = headers.append("token",localStorage.getItem('token_access'));

    this.httpClient.get('http://127.0.0.1:4400/banquier/liste',{headers:headers})
    .subscribe(
      (data:any[]) =>
      { 
        var nomPrenom;
        this.banquiers = data;
        var i = 0;
        while (data[i] != null )
        {
          nomPrenom = data[i]["username"].split(" ",2);
          this.banquiers[i]["nom"] = nomPrenom[0];
          this.banquiers[i]["prenom"] = nomPrenom[1]; 
          i=i+1;
        }
      }, err =>
      {
        if (( err['Status']>= 400) && (err['Status']) < 500 )
        {
          alert("cette session a expiré vous allez être redirigé vers la page de connexion");
        }
      }
    )
  }

}
