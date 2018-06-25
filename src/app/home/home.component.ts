import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpClientModule} from "@angular/common/http";
import { AppComponent} from '../../app/app.component';
import { Router } from '@angular/router';


import {NgStyle} from '@angular/common';
import { CONST_CD, CONST_CE, CONST_DC, CONST_EC, CONST_Thw, CONST_ExtThw, CONST_ThwExt, CONST_URL, CONST_RESSOURCE } from '../../constante';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  baseY = 185.625; // 100 opération --> 15px
            // 1 opération --> ?
  baseX = 60;

  code=[];
  success :boolean;
  textFailed :String;

  // tableau contenant les labels à afficher sur l'arc des X
  months = ['Jan','Fev','Mar','Avr','Mai','Juin','Jul','Aou','Sep','Oct','Nov','Dec'];
  terms = ['1er Trimestre','2ème Trimestre','3ème Trimestre'];


 //tableau contenant les label qui seront affichés sur l'axe les abcisses 
  trimetres = Array();
  mois = Array();
  jours = Array();
  annees = Array();
  anneesNb = Array();

  // tabelau contenants les labels a placer sur l'axe des ordonnées ( variable selon les valeurs de réponse)
  YComMois = [0,0,0,0,0,0,0];
  YComAnne = [0,0,0,0,0,0,0];
  YComJour = [0,0,0,0,0,0,0];
  YComTrimetre = [0,0,0,0,0,0,0];
  YNbMois = [0,0,0,0,0,0,0];
  YNbAnne = [0,0,0,0,0,0,0];
  YNbTrimetre = [0,0,0,0,0,0,0];
  

  constructor(private httpClient:HttpClient, private router: Router) {}
  selectedTab : number;
  displayBlur : String;
  userId : String;
  mode : String;


  grapheMCD: String ;
  grapheMDC: String ;
  grapheMCE: String ;
  grapheMEC: String ;
  grapheMThw: String ;
  grapheMExtThw: String ;
  grapheMThwExt: String ;

  NbMoisCD =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbMoisDC =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbMoisCE =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbMoisEC =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbMoisThw =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbMoisExtThw =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbMoisThwExt =[0,0,0,0,0,0,0,0,0,0,0,0];


  grapheTCD: String ;
  grapheTDC: String ;
  grapheTCE: String ;
  grapheTEC: String ;
  grapheTThw: String ;
  grapheTExtThw: String ;
  grapheTThwExt: String ;

  NbTriCD =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbTriDC =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbTriCE =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbTriEC =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbTriThw =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbTriExtThw =[0,0,0,0,0,0,0,0,0,0,0,0];
  NbTriThwExt =[0,0,0,0,0,0,0,0,0,0,0,0];


  grapheACD: String ;
  grapheADC: String ;
  grapheACE: String ;
  grapheAEC: String ;
  grapheAThw: String ;
  grapheAExtThw: String ;
  grapheAThwExt: String ;

  NbACD =[];
  NbADC =[];
  NbACE =[];
  NbAEC =[];
  NbAThw =[];
  NbAExtThw =[];
  NbAThwExt =[];

  montantComAnnee =[];
  grapheComAnnee : String;

  montantComMois =[];
  grapheComMois : String;
  

  montantComTri =[];
  grapheComTri : String;

  montantComJour =[];
  grapheComJour : String;

  tabGraphes= [];
  tabGraphesSav=[];

  ngOnInit() 
  {
    this.userId = localStorage.getItem('mail');
    ///test a enlever plus tard 
    //localStorage.setItem('blurGest','false');
    
    this.getComMois();
    this.getComAnnee();
    this.getComJour();
    this.getComTri();
    this.getNbMois();
    this.getNbTri();
    this.getNbAnnee();
    
    this.selectedTab = 1 ;
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




  getComMois(){
    var body = {
      'option' : '1'
    }
    var headers = new HttpHeaders()
    headers = headers.append('token',localStorage.getItem('token_access'))
    this.httpClient.post('http://'+CONST_URL+':8080/statistique/commission',body,{headers:headers})
    .subscribe(
      data => {
        let max = data["succe"][0]["montant"];
        for (let index = 0; index < data["succe"].length; index++) {
          this.montantComMois[index] = data["succe"][index]["montant"];
          
          if(max < data["succe"][index]["montant"]){
            max = data["succe"][index]["montant"];
          }
          
          this.mois.push(this.months[ data["succe"][index]["mois"] - 1 ]);

        }
        for (let index = 0; index < 7; index++) {
          if ( index == 0){
            this.YComMois[index] = 0;
          }else {
            this.YComMois[index] = Math.trunc(this.YComMois[index -1] + (max / 6) ) ;
          }  
        }

        this.YComMois.reverse();
      
        let pasYR = this.YComMois[0] - this.YComMois[1];

        this.grapheComMois = this.drawGrapheCom(this.montantComMois,this.grapheComMois,0,pasYR);
        this.tabGraphes[9] = this.grapheComMois;    
        
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
          alert(CONST_RESSOURCE["401"]);
          this.router.navigateByUrl('/');
          break;
          case 500 :
            this.textFailed="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break; 
        }
      }

    );
  }


  getComAnnee(){
    var body = {
      'option' : '3'
    }
    var headers = new HttpHeaders()
    headers = headers.append('token',localStorage.getItem('token_access'))
    this.httpClient.post('http://'+CONST_URL+':8080/statistique/commission',body,{headers:headers})
    .subscribe(
      data => {
        let max = data["succe"][0]["montant"];
        for (let index = 0; index < data["succe"].length; index++) {
          this.montantComAnnee[index] = data["succe"][index]["montant"];
          
          if(max < data["succe"][index]["montant"]){
            max = data["succe"][index]["montant"];
          }
          
          this.annees.push(data["succe"][index]["an"]);
          

        }
        for (let index = 0; index < 7; index++) {
          if ( index == 0){
            this.YComAnne[index] = 0;
          }else {
            this.YComAnne[index] = Math.trunc(this.YComAnne[index -1] + (max / 6) ) ;
          }  
        }

        this.YComAnne.reverse();
      
        let pasYR = this.YComAnne[0] - this.YComAnne[1];

        this.grapheComAnnee = this.drawGrapheCom(this.montantComAnnee,this.grapheComAnnee,2,pasYR);
        this.tabGraphes[10] = this.grapheComAnnee;    
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
          alert(CONST_RESSOURCE["401"]);
          this.router.navigateByUrl('/');
          break;
          case 500 :
            this.textFailed="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break; 
        }
      }

    );
  }



  montants=[];
  getComJour(){
    var body = {
      'option' : '0'
    }
    var headers = new HttpHeaders()
    headers = headers.append('token',localStorage.getItem('token_access'))
    this.httpClient.post('http://'+CONST_URL+':8080/statistique/commission',body,{headers:headers})
    .subscribe(
      data => {
        this.montants = data["succe"];
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
          alert(CONST_RESSOURCE["401"]);
          this.router.navigateByUrl('/');
          break;
          case 500 :
            this.textFailed="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break; 
        }
      }

    );
  }


  getComTri(){
    var body = {
      'option' : '2'
    }
    var headers = new HttpHeaders()
    headers = headers.append('token',localStorage.getItem('token_access'))
    this.httpClient.post('http://'+CONST_URL+':8080/statistique/commission',body,{headers:headers})
    .subscribe(
      data => {
        let max = data["succe"][0]["montant"];
        for (let index = 0; index < data["succe"].length; index++) {
          this.montantComTri[index] = data["succe"][index]["montant"];
          
          if(max < data["succe"][index]["montant"]){
            max = data["succe"][index]["montant"];
          }
          
          this.trimetres.push(this.terms[ data["succe"][index]["trimestre"] - 1 ]);
          
        }
        for (let index = 0; index < 7; index++) {
          if ( index == 0){
            this.YComTrimetre[index] = 0;
          }else {
            this.YComTrimetre[index] = Math.trunc(this.YComTrimetre[index -1] + (max / 6) ) ;
          }
        }

        this.YComTrimetre.reverse();
      
        let pasYR = this.YComTrimetre[0] - this.YComTrimetre[1];

        this.grapheComTri = this.drawGrapheCom(this.montantComTri,this.grapheComTri,1,pasYR);
        this.tabGraphes[12] = this.grapheComTri;    
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
          alert(CONST_RESSOURCE["401"]);
          this.router.navigateByUrl('/');
          break;
          case 500 :
            this.textFailed="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break; 
        }
      }

    );
  }

//******************************************************  Nombre d'opération par type  */
  
//par mois

getNbMois(){
  var body = {
    'option' : '0'
  }
  var headers = new HttpHeaders()
  headers = headers.append('token',localStorage.getItem('token_access'))
  this.httpClient.post('http://'+CONST_URL+':8080/statistique/operation',body,{headers:headers})
  .subscribe(
    data => {
      let max = data["succe"][0]["nombre"];
      for (let index = 0; index < data["succe"].length; index++) {
        
        if(max < data["succe"][index]["nombre"]){
          max = data["succe"][index]["nombre"];
        }
        switch (data["succe"][index]["Type opération"]){ 
          case CONST_CD :
            this.NbMoisCD[ data["succe"][index]["mois"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_CE :
            this.NbMoisCE[ data["succe"][index]["mois"]-1 ] = data["succe"][index]["nombre"];
          break;
          case  CONST_DC :
            this.NbMoisDC[ data["succe"][index]["mois"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_EC :
            this.NbMoisEC[ data["succe"][index]["mois"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_Thw :
            this.NbMoisThw[ data["succe"][index]["mois"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_ExtThw:
            this.NbMoisExtThw[ data["succe"][index]["mois"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_ThwExt : 
            this.NbMoisThwExt[ data["succe"][index]["mois"]-1 ] = data["succe"][index]["nombre"];
          break;

        }

      }
      for (let index = 0; index < 7; index++) {
        if ( index == 0){
          this.YNbMois[index] = 0;
        }else {
          this.YNbMois[index] = Math.trunc(this.YNbMois[index -1] + (max / 6) ) ;
        }  
      }

      this.YNbMois.reverse();
    
      let pasYR = this.YNbMois[0] - this.YNbMois[1];

      this.grapheMCD = this.drawGrapheCom(this.NbMoisCD,this.grapheMCD,0,pasYR);
      this.tabGraphes[101] = this.grapheMCD;  
      this.tabGraphesSav[101] = this.tabGraphes[101];
      
      this.grapheMDC = this.drawGrapheCom(this.NbMoisDC,this.grapheMDC,0,pasYR);
      this.tabGraphes[102] = this.grapheMDC;  
      this.tabGraphesSav[102] = this.tabGraphes[102];

      this.grapheMCE = this.drawGrapheCom(this.NbMoisCE,this.grapheMCE,0,pasYR);
      this.tabGraphes[103] = this.grapheMCE;  
      this.tabGraphesSav[103] = this.tabGraphes[103];

      this.grapheMEC = this.drawGrapheCom(this.NbMoisEC,this.grapheMEC,0,pasYR);
      this.tabGraphes[104] = this.grapheMEC;  
      this.tabGraphesSav[104] = this.tabGraphes[104];

      this.grapheMThw = this.drawGrapheCom(this.NbMoisThw,this.grapheMThw,0,pasYR);
      this.tabGraphes[105] = this.grapheMThw;  
      this.tabGraphesSav[105] = this.tabGraphes[105];

      this.grapheMThwExt = this.drawGrapheCom(this.NbMoisThwExt,this.grapheMThwExt,0,pasYR);
      this.tabGraphes[106] = this.grapheMThwExt;  
      this.tabGraphesSav[106] = this.tabGraphes[106];

      this.grapheMExtThw = this.drawGrapheCom(this.NbMoisExtThw,this.grapheMExtThw,0,pasYR);
      this.tabGraphes[107] = this.grapheMExtThw;
      this.tabGraphesSav[107] = this.tabGraphes[107];  
    }
    ,err => 
    {
      this.success = false;
      switch (err['status'])
      {
        case 401 :
        alert(CONST_RESSOURCE["401"]);
        this.router.navigateByUrl('/');
        break;
        case 500 :
          this.textFailed="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
        break;
        case 0 :
          this.textFailed="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
        break; 
      }
    }

  );
}




//par Trimestre 
  getNbTri(){
    var body = {
      'option' : '1'
    }
    var headers = new HttpHeaders()
    headers = headers.append('token',localStorage.getItem('token_access'))
    this.httpClient.post('http://'+CONST_URL+':8080/statistique/operation',body,{headers:headers})
    .subscribe(
      data => {
        let max = data["succe"][0]["nombre"];
        
      for (let index = 0; index < data["succe"].length; index++) {
        
        if(max < data["succe"][index]["nombre"]){
          max = data["succe"][index]["nombre"];
          
        }
        switch (data["succe"][index]["Type opération"]){ 
          case CONST_CD :
            this.NbTriCD[ data["succe"][index]["trimestre"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_CE :
            this.NbTriCE[ data["succe"][index]["trimestre"]-1 ] = data["succe"][index]["nombre"];
          break;
          case  CONST_DC :
            this.NbTriDC[ data["succe"][index]["trimestre"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_EC :
            this.NbTriEC[ data["succe"][index]["trimestre"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_Thw :
            this.NbTriThw[ data["succe"][index]["trimestre"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_ExtThw:
            this.NbTriExtThw[ data["succe"][index]["trimestre"]-1 ] = data["succe"][index]["nombre"];
          break;
          case CONST_ThwExt : 
            this.NbTriThwExt[ data["succe"][index]["trimestre"]-1 ] = data["succe"][index]["nombre"];
          break;

        }
      }
        for (let index = 0; index < 7; index++) {
          if ( index == 0){
            this.YNbTrimetre[index] = 0;
          }else {
            this.YNbTrimetre[index] = Math.trunc(this.YNbTrimetre[index -1] + (max / 6) ) ;
          }
        }
        this.YNbTrimetre.reverse();
      
        let pasYR = this.YNbTrimetre[0] - this.YNbTrimetre[1];

        this.grapheTCD = this.drawGrapheCom(this.NbTriCD,this.grapheTCD,1,pasYR);
        this.tabGraphes[201] = this.grapheTCD;  
        this.tabGraphesSav[201] = this.tabGraphes[201];
        
        this.grapheTDC = this.drawGrapheCom(this.NbTriDC,this.grapheTDC,1,pasYR);
        this.tabGraphes[202] = this.grapheTDC;  
        this.tabGraphesSav[202] = this.tabGraphes[202];
  
        this.grapheTCE = this.drawGrapheCom(this.NbTriCE,this.grapheTCE,1,pasYR);
        this.tabGraphes[203] = this.grapheTCE;  
        this.tabGraphesSav[203] = this.tabGraphes[203];
  
        this.grapheTEC = this.drawGrapheCom(this.NbTriEC,this.grapheTEC,1,pasYR);
        this.tabGraphes[204] = this.grapheTEC;  
        this.tabGraphesSav[204] = this.tabGraphes[204];
  
        this.grapheTThw = this.drawGrapheCom(this.NbTriThw,this.grapheTThw,1,pasYR);
        this.tabGraphes[205] = this.grapheTThw;  
        this.tabGraphesSav[205] = this.tabGraphes[205];
  
        this.grapheTThwExt = this.drawGrapheCom(this.NbTriThwExt,this.grapheTThwExt,1,pasYR);
        this.tabGraphes[206] = this.grapheTThwExt;  
        this.tabGraphesSav[206] = this.tabGraphes[206];
  
        this.grapheTExtThw = this.drawGrapheCom(this.NbTriExtThw,this.grapheTExtThw,1,pasYR);
        this.tabGraphes[207] = this.grapheTExtThw;
        this.tabGraphesSav[207] = this.tabGraphes[207]; 
          
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
          alert(CONST_RESSOURCE["401"]);
          this.router.navigateByUrl('/');
          break;
          case 500 :
            this.textFailed="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break; 
        }
      }
  );
}


//par année
  getNbAnnee(){
    var body = {
      'option' : '2'
    }
    var headers = new HttpHeaders()
    headers = headers.append('token',localStorage.getItem('token_access'))
    this.httpClient.post('http://'+CONST_URL+':8080/statistique/operation',body,{headers:headers})
    .subscribe(
      data => {
        let max = data["succe"][0]["nombre"];
        
      for (let index = 0; index < data["succe"].length; index++) {
        
        
        let i = this.anneesNb.indexOf(data["succe"][index]["an"])
        if(i < 0){
          this.anneesNb.push(data["succe"][index]["an"]);
        }

        if(max < data["succe"][index]["nombre"]){
          max = data["succe"][index]["nombre"];
        }
        switch (data["succe"][index]["Type opération"]){ 
          case CONST_CD :
            this.NbACD.push(data["succe"][index]["nombre"]);
          break;
          case CONST_CE :
            this.NbACE.push(data["succe"][index]["nombre"]);
          break;
          case  CONST_DC :
            this.NbADC.push(data["succe"][index]["nombre"]);
          break;
          case CONST_EC :
            this.NbAEC.push(data["succe"][index]["nombre"]);
          break;
          case CONST_Thw :
            this.NbAThw.push(data["succe"][index]["nombre"]);
          break;
          case CONST_ExtThw:
            this.NbAExtThw.push(data["succe"][index]["nombre"]);
          break;
          case CONST_ThwExt : 
            this.NbAThwExt.push(data["succe"][index]["nombre"]);
          break;

        }
      }
        for (let index = 0; index < 7; index++) {
          if ( index == 0){
            this.YNbAnne[index] = 0;
          }else {
            this.YNbAnne[index] = Math.trunc(this.YNbAnne[index -1] + (max / 6) ) ;
          }
        }
        this.YNbAnne.reverse();
      
        let pasYR = this.YNbAnne[0] - this.YNbAnne[1];

        this.grapheACD = this.drawGrapheCom(this.NbACD,this.grapheACD,2,pasYR);
        this.tabGraphes[301] = this.grapheACD;  
        this.tabGraphesSav[301] = this.tabGraphes[301];
        
        this.grapheADC = this.drawGrapheCom(this.NbADC,this.grapheADC,2,pasYR);
        this.tabGraphes[302] = this.grapheADC;  
        this.tabGraphesSav[302] = this.tabGraphes[302];
  
        this.grapheACE = this.drawGrapheCom(this.NbACE,this.grapheACE,2,pasYR);
        this.tabGraphes[303] = this.grapheACE;  
        this.tabGraphesSav[303] = this.tabGraphes[303];
  
        this.grapheAEC = this.drawGrapheCom(this.NbAEC,this.grapheAEC,2,pasYR);
        this.tabGraphes[304] = this.grapheAEC;  
        this.tabGraphesSav[304] = this.tabGraphes[304];
  
        this.grapheAThw = this.drawGrapheCom(this.NbAThw,this.grapheAThw,2,pasYR);
        this.tabGraphes[305] = this.grapheAThw;  
        this.tabGraphesSav[305] = this.tabGraphes[305];
  
        this.grapheAThwExt = this.drawGrapheCom(this.NbAThwExt,this.grapheAThwExt,2,pasYR);
        this.tabGraphes[306] = this.grapheAThwExt;  
        this.tabGraphesSav[306] = this.tabGraphes[306];
  
        this.grapheAExtThw = this.drawGrapheCom(this.NbAExtThw,this.grapheAExtThw,2,pasYR);
        this.tabGraphes[307] = this.grapheAExtThw;
        this.tabGraphesSav[307] = this.tabGraphes[307]; 
          
      }
      ,err => 
      {
        this.success = false;
        switch (err['status'])
        {
          case 401 :
          alert(CONST_RESSOURCE["401"]);
          this.router.navigateByUrl('/');
          break;
          case 500 :
            this.textFailed="Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement";
          break;
          case 0 :
            this.textFailed="Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet";
          break; 
        }
      }
  );
  }


//dessin de graphe
  drawGrapheCom(table:any[],graphe:String, type:number,pas:number)
  {
    var x = this.baseX;
    var pasY, pasX;
    
    switch (type)
    {
      case 0 :   // graphe par mois
        pasX = 62;
      break;
      case 1 :   // graphe par trimestre   
        pasX = 150; 
      break;
      case 2 :   // graphe par année
        pasX = 92;
      break;
    }
    if( table.length === 1){
      var y = table[0] * 24.425 / pas;
      y = this.baseY - y;
      
      graphe = "M"+x+","+y+"";
      
      graphe = graphe +" L"+x+","+y+"";
      graphe = graphe +" L"+(x+10)+","+y+"";
      
      x=x+pasX;
    }else{
      for (let index = 0; index < table.length; index++)
      {
      
        var y = table[index] * 24.425 / pas;
        y = this.baseY - y;
        
        if(index === 0)
        {
          graphe = "M"+x+","+y+"";
        }
        
        graphe = graphe +" L"+x+","+y+"";
        x=x+pasX;
      }
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
    this.httpClient.post('http://'+CONST_URL+':8081/oauth/login',body,{headers:headers})
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
        this.httpClient.get('http://'+CONST_URL+':8080/users/dashBoard',{headers : headers})
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

  showGraphe(idGraphe : number)
  {
    if (this.tabGraphes[idGraphe] === "") 
    {
      this.tabGraphes[idGraphe] = this.tabGraphesSav[idGraphe];
    } else 
    {
      this.tabGraphes[idGraphe] = "";
    }
  }

  deleteBlur()
  {
    localStorage.setItem('blurGest','false');
    this.displayBlur = "none";
  }


  getBlurState()
  {
    if (localStorage.getItem('blurGest')==='true'){
      alert("");
      return true;
    }
    else
    {
      return false;
    }
  }

}