import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CustomHttpClient} from '../../CustomHttpClient'
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class Service{

    constructor(private httpClient : HttpClient){}

    getVirement( )
    {
        var userMail : String;
        var code :number;
        var customHttpClient = new CustomHttpClient(this.httpClient);    
        return customHttpClient.get('http://192.168.0.220:8080/Virement/ListVirementNonTraites')
    }


    getImage(id: string) {

        var body =
        {
            'idVirement' : id
        }

        let headers = new HttpHeaders();
        //headers = headers.append('token','Vk5sdkIaq5fAnhepbrXOndqFtRscTXrVQWPUKX5bjAKsZAI4UJSpEKItNEoBJdsgECrVCHTCOohIozlsuugwnD3wKnRtYOtnZBJ14NGwZH4Ya6TnOpfSWbo5Bxvh4ybjI1385jHklEDfsqoSwLstQv792W7E6ENA3klObi4QrMExjbEPOJUbmUX5j6uwT36MM87zNIjXqOW6c3GKaXGANvQ9HOCaX2eNaDQtySq5iJv5dvUJgnQodrN7GYXVpxq');
        headers = headers.append('token',localStorage.getItem('token_access'))
        headers = headers.append('responseType', 'blob');
        return this.httpClient
        .post("http://localhost:8080/clients/avatar",body, {headers:headers});
    }

    
    valider(codeVire:string,status : string)
    {
        
        var body = 
        {
          'code' : "String",
          'statut' : "String"
        };

        body.code = codeVire;
        body.statut = status;
        var customHttpClient = new CustomHttpClient(this.httpClient);
        return customHttpClient.post('http://192.168.0.220:8080/Virement/validRejetVir',body);
    }

}