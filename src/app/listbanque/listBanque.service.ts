import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { CONST_URL } from '../../constante';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    getBanque( )
    {
        var headers = new HttpHeaders();
        //headers = headers.append("token","SkCWpa8TzBdFXVP9SQS21WgJwFJZfXJpxDQqIiq5v25LBXZobWnfNXUqlByuEJ1mhJhVubl04b2m2DZbpzqmDWn9rjDU4hHDMiKi9Drr9buSQXNduHrOMsyrXCYXhj6fZt5oczRso0BQlSeKY5BJRLjQt4Cm0bgPxN7EMbHo27HOaZrhmMXQDpErwoPRGvLHYvy4aJlxs1pJl5SDo6ulGOTPEEvJvR1QsVJe0Q18XEBWW4gR2H9pcc1tRwVzDrs");
        headers = headers.append("token",localStorage.getItem('token_access'));

        
        return this.httpClient.get('http://'+CONST_URL+':8080/gestionnaire/listBanque',{headers:headers})
    }

    deleteBanque(code:String){
        var headers = new HttpHeaders();
    
        headers = headers.append("token",localStorage.getItem('token_access'));
        //headers = headers.append("token","SkCWpa8TzBdFXVP9SQS21WgJwFJZfXJpxDQqIiq5v25LBXZobWnfNXUqlByuEJ1mhJhVubl04b2m2DZbpzqmDWn9rjDU4hHDMiKi9Drr9buSQXNduHrOMsyrXCYXhj6fZt5oczRso0BQlSeKY5BJRLjQt4Cm0bgPxN7EMbHo27HOaZrhmMXQDpErwoPRGvLHYvy4aJlxs1pJl5SDo6ulGOTPEEvJvR1QsVJe0Q18XEBWW4gR2H9pcc1tRwVzDrs");

        var body = {
            'Code':code
        }
        
        return this.httpClient.post('http://'+CONST_URL+':8080/gestionnaire/deletebanque',body,{headers:headers})
    }
    
    updateBanque(bank:any){
        var headers = new HttpHeaders();
    
        headers = headers.append("token",localStorage.getItem('token_access'));
        
        
        return this.httpClient.post('http://'+CONST_URL+':8080/gestionnaire/editbanque',bank,{headers:headers})
    }
}