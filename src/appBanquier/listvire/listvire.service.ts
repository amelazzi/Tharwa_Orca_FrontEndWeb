import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    getVirement( )
    {
        var userMail : String;
        var code :number;
        
        let headers = new HttpHeaders();
        
        //headers = headers.append("token",localStorage.getItem('token_access'));
        headers = headers.append("token", "Vk5sdkIaq5fAnhepbrXOndqFtRscTXrVQWPUKX5bjAKsZAI4UJSpEKItNEoBJdsgECrVCHTCOohIozlsuugwnD3wKnRtYOtnZBJ14NGwZH4Ya6TnOpfSWbo5Bxvh4ybjI1385jHklEDfsqoSwLstQv792W7E6ENA3klObi4QrMExjbEPOJUbmUX5j6uwT36MM87zNIjXqOW6c3GKaXGANvQ9HOCaX2eNaDQtySq5iJv5dvUJgnQodrN7GYXVpxq");

        return this.httpClient.get('http://192.168.0.220:8080/Virement/ListVirementNonTraites',{headers:headers})
    }

    
    valider(codeVire:string,status : string)
    {
        
        let headers = new HttpHeaders();

        //headers = headers.append("token",localStorage.getItem('token_access'));
        headers = headers.append("token", "Vk5sdkIaq5fAnhepbrXOndqFtRscTXrVQWPUKX5bjAKsZAI4UJSpEKItNEoBJdsgECrVCHTCOohIozlsuugwnD3wKnRtYOtnZBJ14NGwZH4Ya6TnOpfSWbo5Bxvh4ybjI1385jHklEDfsqoSwLstQv792W7E6ENA3klObi4QrMExjbEPOJUbmUX5j6uwT36MM87zNIjXqOW6c3GKaXGANvQ9HOCaX2eNaDQtySq5iJv5dvUJgnQodrN7GYXVpxq");

        var body = 
        {
          'code' : "String",
          'statut' : "String"
        };

        body.code = codeVire;
        body.statut = status;
        
        return this.httpClient.post('http://192.168.0.220:8080/Virement/validRejetVir',body,{headers:headers})
    }

}