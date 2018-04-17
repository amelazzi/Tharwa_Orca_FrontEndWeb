import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    getVirement( )
    {
        var userMail : String;
        var code :number;
        
        
        let headers = new HttpHeaders();
        
        
    
        
        return this.httpClient.get('http://api-tharwaa.cleverapps.io/ListVirementNonTraites',{headers:headers})
    }

    valider(codeVire:string,status : string)
    {
        var userMail : String;
        var code :number;
        
        
        let headers = new HttpHeaders();
        
        
    
        
        return this.httpClient.put('http://api-tharwaa.cleverapps.io/virement/validRejetVir',{headers:headers})
    }

}