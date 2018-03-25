
import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}
    getTokenInfo(token_access:String)
    {
    var alive : Boolean = false;
    var headers = new HttpHeaders();
    headers = headers.append("token",""+token_access+"");
    
    return this.httpClient.get("http://api-tharwaa.cleverapps.io/users/dashBoard",{headers:headers});
    }

}