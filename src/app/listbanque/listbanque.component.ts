import { Component, OnInit } from '@angular/core';

import { AppComponent} from '../../app/app.component';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listbanque',
  templateUrl: './listbanque.component.html',
  styleUrls: ['./listbanque.component.scss']
})
export class ListbanqueComponent implements OnInit {
  
  constructor(private httpClient:HttpClient, private router:Router) 
  {
    
  }
  
  ngOnInit() 
  {
    
    localStorage.setItem('selectedItem','6');
    var appCompo=new AppComponent(this.httpClient, this.router);
    appCompo.route();
    this.getBanque();
  }
  banques :any[];
  getBanque()
  {
    var headers = new HttpHeaders();
    headers = headers.append("token",localStorage.getItem('token_access'));

    this.httpClient.get('http://127.0.0.1:4400/banque/liste',{headers:headers})

    .subscribe(
      (data:any[]) =>
      { 
        this.banques = data;
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
