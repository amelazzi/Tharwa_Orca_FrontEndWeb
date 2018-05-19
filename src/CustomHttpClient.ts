import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class CustomHttpClient{

    constructor(private httpClient : HttpClient){}

    get(url:string)
    {
        var userMail : String;
        var code :number;
        
        let headers = new HttpHeaders();
        
        headers = headers.append("token", "localStorage.getItem('token_access')");

        return this.httpClient.get(url,{headers:headers})
    }

    post(url:string,body:any)
    {
        let headers = new HttpHeaders();
        headers = headers.append("token", "localStorage.getItem('token_access')");

        return this.httpClient.post(url,body,{headers:headers});
    }
}