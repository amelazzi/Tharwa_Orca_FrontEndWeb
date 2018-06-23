import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { CustomHttpClient } from '../../CustomHttpClient';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    addBanque(body:any)
    {
        var httpHeader = new HttpHeaders();
        var customHttp = new CustomHttpClient(this.httpClient);

        return customHttp.post('http://à précisé:8080/banque/add',body,httpHeader);
    
    }

}