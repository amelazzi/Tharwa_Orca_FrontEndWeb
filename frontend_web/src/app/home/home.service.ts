import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    tryDeleteBlur( )
    {
        var userMail : String;
        var code :number;
        
        
        let headers = new HttpHeaders();
        headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers = headers.append("Authorization","Basic Y2xpZW50d2ViOm9yY2FAMjAxOA==");
        
    
        
    
        var  body = "grant_type=password&username="+userMail+"&password="+code+"";
        
    
        //on envoie la requete au service pour vérifier le code
        return this.httpClient.post('https://auththarwa.cleverapps.io/oauth/login',body,{headers:headers})
    }


    getBlurState()
    {
      if (localStorage.getItem('blur')==='true'){
        return true; 
      }
      else
      {
        return false;
      }
    }

}