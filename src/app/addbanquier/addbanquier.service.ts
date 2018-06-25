import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { CONST_URL } from '../../constante';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    addBanquier(mail:String,tel:String,nom:String,prenom:String,pass:String)
    {
        var headers = new HttpHeaders();
        localStorage.setItem('token_access','r3y7VDzkCMHw5FvoMj99V7Gy8yKuglaK2yaBI3gbUfOjFMDTE2O8zPCnGoSlPcRxGNmFpQT6WfqnA22k2RpplrZUqYmliRNHDXjplmDs2almfpOd9evShNEAxKEoVhktQQlVmYE8Mw6Q3OgTfTq9YDcjD04ps1NUUasSZABECEssgoLar7RRr8vseaJiXxoqeH01qbtzrnqumIbsuolVVq1RMLAgkzj6lEy1tqQzPdsDr8MCQhv8RVOLECaX51J')

        headers = headers.append("token",""+localStorage.getItem('token_access')+"");
        var body="userId="+mail+"&Tel="+tel+"&UserName="+nom+" "+prenom+"+&Pwd="+pass+"";
        return this.httpClient.post("http://"+CONST_URL+":8080/users/BankerInscription",body,{headers:headers})
    }

}