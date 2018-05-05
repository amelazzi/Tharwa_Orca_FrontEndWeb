import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    addBanquier(mail:String,tel:String,nom:String,prenom:String,pass:String)
    {
        var headers = new HttpHeaders();
    
        headers = headers.append("token",""+localStorage.getItem('token_access')+"");
        
        headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
        
        var body="userId="+mail+"&Tel="+tel+"&UserName="+nom+" "+prenom+"+&Pwd="+pass+"";
        return this.httpClient.post("http://192.168.0.164:8080/users/BankerInscription",body,{headers:headers})
        //this.httpClient.post("http://api-tharwaa.cleverapps.io/users/BankerInscription",body,{headers:headers})
    
    }

}