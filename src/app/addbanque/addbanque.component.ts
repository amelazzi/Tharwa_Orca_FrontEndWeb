import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-addbanque',
  templateUrl: './addbanque.component.html',
  styleUrls: ['./addbanque.component.scss']
})
export class AddbanqueComponent implements OnInit {

  constructor(private httpClient : HttpClient, private router:Router) { }
  formBanque:FormGroup;
  ngOnInit() {




    this.formBanque = new FormGroup({
      mail: new FormControl(''),
      code : new FormControl(''),
      raison : new FormControl(''),
      adresse : new FormControl(''),
    });


    localStorage.setItem('selectedItem','7');
  }

  addBanque()
  {
    var headers : HttpHeaders;
    headers.append("token",localStorage.getItem('token_access') );
    var body = "";
    this.httpClient.post("http://api-tharwaBank/",body,{headers:headers})
    .subscribe(
      data => {
        alert("banque ajouté");
      }
    );
  }

}
