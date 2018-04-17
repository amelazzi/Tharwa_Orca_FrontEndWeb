import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listvirexterne',
  templateUrl: './listvire.component.html',
  styleUrls: ['./listvire.component.scss']
})
export class ListvireComponent implements OnInit {

  constructor(private httpClient:HttpClient, private router:Router) { }
  virements : any[];
  ngOnInit() {
    this.getVirement();
  }

  Virement = 
    {
      'Code' : 'String',
      'BanqueDestinataire' : 'String',
      'BanqueEmmeteur' : 'String',
      'CompteEmmetteur' : 'String',
      'CompteDestinataire' : 'String',
      'Date' : 'String',
      'IdCommission' : 'String',
      'Justificatif' : 'String',
      'Montant' : 'int',
      'Motif' : 'String',
      'NomEmetteur' : 'String',
      'NomDestinataire' : 'String',
      'NumOrdreVirement' : 'int',
    };
  
  //fonction qui récupère la liste des virement non-traites
  getVirement()
  {
    var headers = new  HttpHeaders();

    headers = headers.append("token", "EWVkyX9tlGFag9uqkMuW7JWiz9UGRfWnHtPQd3EL7cbfopJTKt15xEZc5ul0VkPyycMx3JGgDLT988tQNp1LwkBS0LuZpmSyWcqQpdsYU6W05OcfITrHHoqVLpIxeRWWOcYkcKYcHKdfI7uo0DtAEtrV5Z16Zn8BDf2Qfbxpog7ptRdJWk3tVZqPveYTYYSXzDQdRyb6j2kN9FPXN00wl12vqX9JewEDk7ZXiNCGxffKqhc4ytjsUHUa0TI944p");
    
    this.httpClient.get('http://192.168.0.39:8088/virement/ListVirementNonTraites',{headers:headers})
    .subscribe(
      (data:any[]) =>
      { 
        this.virements = data;
        console.log(this.virements);
      }
      ,err =>
      {
        console.log(err);
        switch (err['status'])
        {
          case 401 :
            alert("cette session a expiré vous allez être redirigé vers la page de connexion");
          break;
          case 500 :
            alert("Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement");
          break;
          case 0 :
            alert("Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet");
          break; 
        }   
      }
    );
  }


  //fonction qui renvoie les informations d'un virement
  getVirementInfo(codeVire : String)
  {
    var i = 0 ;
    while (this.virements[i]["Code"] != codeVire )
    {
      i=i+1;
    }
    this.Virement = this.virements[i];
  }


  //fonction qui valide ou rejette un virement
  valider(codeVire:string,status : string)
  {
    console.log(codeVire,status);
    var headers = new HttpHeaders();

  
    headers = headers.append("token", "EWVkyX9tlGFag9uqkMuW7JWiz9UGRfWnHtPQd3EL7cbfopJTKt15xEZc5ul0VkPyycMx3JGgDLT988tQNp1LwkBS0LuZpmSyWcqQpdsYU6W05OcfITrHHoqVLpIxeRWWOcYkcKYcHKdfI7uo0DtAEtrV5Z16Zn8BDf2Qfbxpog7ptRdJWk3tVZqPveYTYYSXzDQdRyb6j2kN9FPXN00wl12vqX9JewEDk7ZXiNCGxffKqhc4ytjsUHUa0TI944p");
    var body = 
    {
      'code' : "String",
      'statut' : "String"
    };

    body.code = codeVire;
    body.statut = status;
    this.httpClient.post('http://192.168.0.39:8088/virement/validRejetVir',body,{headers:headers})
    .subscribe(
    data =>
    {
        alert("Virement validé avec succès");
        this.getVirement();
    }
    ,err => 
    {
      switch (err['status'])
        {
          case 401 :
            alert("cette session a expiré vous allez être redirigé vers la page de connexion");
            this.router.navigateByUrl('/');
          break;
          case 404 :
            alert("virement introuvable vérifiez qu'il n'a pas déjà été traité"); 
          break;
          case 500 :
            alert("Une erreur interne au serveur s'est produite veuillez réessayer ulérieurement");
          break;
          case 0 :
            alert("Le délai d'attente de la connexion a été dépassé, vérifier votre connexion internet");
          break; 
        }
    }
    );
  }
}