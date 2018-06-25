import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { CustomHttpClient } from '../../CustomHttpClient';
import { CONST_URL } from '../../constante';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    addBanque(body:any)
    {
        let headers = new HttpHeaders();
        
        headers = headers.append("token",localStorage.getItem('token_access'));
        //headers = headers.append("token","SkCWpa8TzBdFXVP9SQS21WgJwFJZfXJpxDQqIiq5v25LBXZobWnfNXUqlByuEJ1mhJhVubl04b2m2DZbpzqmDWn9rjDU4hHDMiKi9Drr9buSQXNduHrOMsyrXCYXhj6fZt5oczRso0BQlSeKY5BJRLjQt4Cm0bgPxN7EMbHo27HOaZrhmMXQDpErwoPRGvLHYvy4aJlxs1pJl5SDo6ulGOTPEEvJvR1QsVJe0Q18XEBWW4gR2H9pcc1tRwVzDrs");


        var customHttp = new CustomHttpClient(this.httpClient);

        return this.httpClient.post('http://'+CONST_URL+':8080/gestionnaire/addbanque',body,{headers:headers});
        //return customHttp.post('http://25.0.181.111:8088/gestionnaire/addbanque',body,httpHeader);
    }

}