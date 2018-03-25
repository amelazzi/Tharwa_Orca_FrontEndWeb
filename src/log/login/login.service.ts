import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    authentifier(){
        var userMail : String ;
        var pass : String;
        let headers = new HttpHeaders();
    
        
        

        headers = headers.append("Content-Type", "application/x-www-form-urlencoded");    
        const body="userId=test_tharwa@mailinator.com&Pwd=orca@2018&code=0";

        return this.httpClient.post('https://auththarwa.cleverapps.io/oauth/code',body, {headers: headers})

    }
}
