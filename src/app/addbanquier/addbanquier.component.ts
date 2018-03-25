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

    var appCompo=new AppComponent(this.httpClient, this.router);
    appCompo.route();
    


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
    headers = headers.append("token","xiDtyQfvSDzw32G2LNpjqtagrygh1rK5cU3pH7qP1uyVtIwWTeCTbCIWkf4pY6scYSITNLhDgp56yFrUQbDZaN6FhhBO6kmOPIlj9qb4rSewUhaVr7vXFovwCcmE787kj8FOGAg5JiykDZwqIocLm9gbFkU29U3De2W9eeDvcGFgpHg1A1sCKIP9ascF974QZFRe1iyDeQwiUE2tFUcnCDt7xnRsVZwIlqdYv8a8552qZXRWHYS1doJkY2pHdDr");
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    var body="userId="+this.mail+"&Tel="+this.tel+"&UserName="+this.nom+" "+this.prenom+"+&Pwd="+this.pass+"";
    //this.httpClient.post("http://127.0.0.1:8080/users/BankerInscription",body,{headers:headers})
    this.httpClient.post("http://api-tharwaa.cleverapps.io/users/BankerInscription",body,{headers:headers})
    .subscribe(
      data => {
        alert("banquier ajouté");
      }
    );
  }

}
