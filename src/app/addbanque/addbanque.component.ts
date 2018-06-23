import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { CONST_UNAUTHORIZED, CONST_DELAIDEPASSE,CONST_NOT_FOUND,CONST_RESSOURCE,CONST_SERVEUR_ERROR,CONST_VALIDE } from '../../constante';
import { Service } from '../../app/addbanque/addbanque.service';

@Component({
  selector: 'app-addbanque',
  templateUrl: './addbanque.component.html',
  styleUrls: ['./addbanque.component.scss']
})
export class AddbanqueComponent implements OnInit {

  constructor(private httpClient : HttpClient, private router:Router) { }
  formBanque:FormGroup;
  
  code:string;
  mail:string;
  raison:string;
  adresse:string;


  success:boolean;
  textFailed :string; 
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
    let service = new Service(this.httpClient);
    
    var body={
      'code': this.code,
      'raison': this.raison,
      'adresse' :this.adresse,
      'mail' : this.mail
    };

    service.addBanque(body)
    .subscribe(
      data => {
        ////à compléter une fois le service coté back end pret

        alert("banque ajouté");
        
        this.router.navigateByUrl('/gestionnaire/listbanque');
      },err =>{
        this.success = false;
        console.log(err);
        switch (err['status'])
        {
          case CONST_UNAUTHORIZED :
            this.textFailed = CONST_RESSOURCE["401"];
            this.router.navigateByUrl('/');
          break;
          case CONST_NOT_FOUND :
            this.textFailed =CONST_RESSOURCE["404"];
          break;
          case CONST_SERVEUR_ERROR :
            this.textFailed = CONST_RESSOURCE["500"];
          break;
          case CONST_DELAIDEPASSE :
            this.textFailed =CONST_RESSOURCE["0"];
          break; 
        }  
      }
    );
  }
}
