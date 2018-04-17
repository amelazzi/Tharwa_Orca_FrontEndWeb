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
        
        
    
        
        return this.httpClient.get('http://api-tharwaa.cleverapps.io/gestionnaire/listVirementEx',{headers:headers})
    }

}