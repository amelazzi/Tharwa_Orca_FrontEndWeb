import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class CustomHttpClient{

    constructor(private httpClient : HttpClient){}

    get(url:string, headers:HttpHeaders)
    {
        var userMail : String;
        var code :number;
        
        headers = headers.append("token", localStorage.getItem('token_access'));

        return this.httpClient.get(url,{headers:headers});
    }




    post(url:string,body:any,headers:HttpHeaders)
    {
        headers = headers.append("token", localStorage.getItem('token_access'));

        return this.httpClient.post(url,body,{headers:headers});
    }
}