import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { AppComponent} from '../../app/app.component';
import { Router } from '@angular/router';


import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  baseY = 185; // 100 opération --> 15px
            // 1 opération --> ?
  baseX = 60;

  code=[];
  
  
  // tableau contenant les labels à afficher sur l'arc des Y
  nbVirsMois = ['600','500','400','300','200','100','0']; 
  // tableau contenant les labels à afficher sur l'arc des X
  months = ['Jan','Fev','Mar','Avr','Mai','Juin','Jul','Aou','Sep','Oct','Nov','Dec'];

  nbVirsJour = ['120','100','80','60','40','20','0'];
  days = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

  nbVirsAnnee = ['18000','15000','12000','9000','6000','3000','0'];
  years = [];

  constructor(private httpClient:HttpClient, private router: Router) {}
  selectedTab : number;
  displayBlur : String;
  userId : String;
  mode : String;

  
  nbTransacMoisCac:any[];
  nbTransacMoisThw:any[];
  nbTransacMoisExt:any[];

  grapheMCac: String ;
  grapheMThw: String ;
  grapheMExt: String ;


  nbTransacJourCac:any[];
  nbTransacJourThw:any[];
  nbTransacJourExt:any[];

  grapheJCac: String ;
  grapheJThw: String ;
  grapheJExt: String ;

  nbTransacAnneCac:any[];
  nbTransacAnneThw:any[];
  nbTransacAnneExt:any[];

  grapheACac: String ;
  grapheAThw: String ;
  grapheAExt: String ;


  ngOnInit() 
  {
    this.userId = localStorage.getItem('mail');

    this.nbTransacMoisCac = [58,42,80,91,140,120,126,90,135,200,250,342];
    this.nbTransacMoisThw = [100,110,111,111,130,127,150,95,178,100,87,65];
    this.nbTransacMoisExt = [38,42,85,101,100,10,166,190,145,247,250,201];

    this.grapheMCac = this.drawGraphe(this.nbTransacMoisCac,this.grapheMCac,0);
    this.grapheMThw = this.drawGraphe(this.nbTransacMoisThw,this.grapheMThw,0);
    this.grapheMExt = this.drawGraphe(this.nbTransacMoisExt,this.grapheMExt,0);


    this.nbTransacJourCac = [100,55,41,12,50,32,5];
    this.nbTransacJourThw = [55,140,110,50,23,14,0];
    this.nbTransacJourExt = [95,78,20,45,145,0,0];

    this.grapheJCac = this.drawGraphe(this.nbTransacJourCac,this.grapheJCac,1);
    this.grapheJThw = this.drawGraphe(this.nbTransacJourThw,this.grapheJThw,1);
    this.grapheJExt = this.drawGraphe(this.nbTransacJourExt,this.grapheJExt,1);

    this.nbTransacAnneCac = [18000,140,110,50,23,14,0];
    this.nbTransacAnneThw = [95,78,20,45,145,0,0];
    this.nbTransacAnneExt = [38,42,85,101,100,10,166];

    this.grapheACac = this.drawGraphe(this.nbTransacAnneCac,this.grapheACac,2);
    this.grapheAThw = this.drawGraphe(this.nbTransacAnneThw,this.grapheAThw,2);
    this.grapheAExt = this.drawGraphe(this.nbTransacAnneExt,this.grapheAExt,2);



    localStorage.setItem('blurGest','false');

    localStorage.setItem('selectedItem','1');
    if(localStorage.getItem('blurGest') === "false")
    {
      this.displayBlur = "none";
    }


    if(localStorage.getItem('') === '0' )
    {
      this.mode = "email"
    }
    else if (localStorage.getItem('') === '1')
    {
      this.mode = "telephone"
    }

  }

  drawGraphe(table:any[],graphe:String, type:number)
  {
    var x = this.baseX;
    var y = this.baseY;
    var pasY, pasX;
    // 32 ---> maring-right 10px
   
    switch (type)
    {
      case 0 :   // graphe par mois
        pasX = 62;
        pasY = 0.25; 
      break;
      case 1 :   // graphe par jour    
        pasX = 90;
        pasY = 1.25; //0.25* 30
      break;
      case 2 :   // graphe par année
        pasX = 92;
        pasY = 0.0083; //0.25 / 30
      break;
    }
      
    for (let index = 0; index < table.length; index++)
    {
      var y = table[index] * pasY;
      y = 185 - y;
      if(index === 0)
      {
        graphe = "M"+x+","+y+"";
      }
      
      graphe = graphe +" L"+x+","+y+"";
      x=x+pasX;
    }
    return graphe;
  }



  
  tryDeleteBlur()
  {
    var headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers = headers.append("Authorization","Basic Y2xpZW50d2ViOm9yY2FAMjAxOA==");
    

    var codeEnvoi = this.code[0] + "" + this.code[1]+""+this.code[2]+""+this.code[3]+""; // code à envoyer
    var  body = "grant_type=password&username="+localStorage.getItem('mail')+"&password="+codeEnvoi+"";

    

    //on envoie la requete au serveur d'authentification pour vérifier le code a 4 chiffres
    //this.httpClient.post('https://auththarwa.cleverapps.io/oauth/login',body,{headers:headers})
    this.httpClient.post('http://192.168.0.164:8081/oauth/login',body,{headers:headers})
    .subscribe(responseToken =>
      //reponse donné par le serveur après avoir valider le code, elle contient l'access token
      {
        console.log(responseToken);


        localStorage.setItem('token_access',responseToken["access_token"]);
        localStorage.setItem('refresh',responseToken["refresh_token"]);

        var headers = new HttpHeaders();
        headers = headers.append("token",localStorage.getItem('token_access'));

        //on envoie la requete pour vérifier le token reçu au service app
        
        //this.httpClient.get('http://api-tharwaa.cleverapps.io/users/dashBoard',{headers : headers})
        this.httpClient.get('http://192.168.0.164:8080/users/dashBoard',{headers : headers})
        .subscribe(response =>  
          {
            // si le code est valide
            localStorage.setItem('mail',response["userId"]);
            
            this.deleteBlur();
            
          }
          ,err =>
          {
            console.log(err);
            localStorage.clear();
            
          }
        );

      }
    ,err =>
    {
      if((err["status"] === 403) || (err["status"] === 409)){
        alert("le code entré est érroné");
      }
      else if (err["status"]>=  500)
      {
        alert("oups une erreur sur notre serveur est survenue ! veuillez réessayer dans un instant");
      }
    });


  }

  deleteBlur()
  {
    localStorage.setItem('blurGest','false');
    this.displayBlur = "none";
  }


  getBlurState()
  {
    if (localStorage.getItem('blurGest')==='true'){
      return true;
    }
    else
    {
      return false;
    }
  }


}