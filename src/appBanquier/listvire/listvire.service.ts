import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CustomHttpClient} from '../../CustomHttpClient'
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class Service{
    constructor(private httpClient : HttpClient){}
    getVirement()
    {
        
        var headers = new HttpHeaders()
        var userMail : String;
        var code :number;
        var customHttpClient = new CustomHttpClient(this.httpClient);    
        return customHttpClient.get('http://192.168.43.64:8088/Virement/ListVirementNonTraites',headers);
    }


    getImage(id: string) 
    {
        let headers = new HttpHeaders();
        headers = headers.append('codevirement',id);
        headers = headers.append('responseType', 'blob');
        var customHttpClient = new CustomHttpClient(this.httpClient); 
        return customHttpClient
        .get("http://192.168.43.64:8088/virement/justificatif", headers);
    }

    
    valider(codeVire:string,status : string)
    {   
        var body = 
        {
          'code' : codeVire,
          'statut' : status
        };
        var headers = new HttpHeaders();
        var customHttpClient = new CustomHttpClient(this.httpClient);
        return customHttpClient.post('http://192.168.43.64:8088/Virement/validRejetVir',body,headers);
    }
}