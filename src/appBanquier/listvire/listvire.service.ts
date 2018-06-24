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
        return customHttpClient.get('http://192.168.137.1:8080/Virement/ListVirementNonTraites',headers);
    }


    getImage(id: string)  
    {
        let headers = new HttpHeaders();
        headers = headers.append('codevirement',id);
        headers = headers.append('responseType', 'blob');

        headers = headers.append("token", localStorage.getItem('token_access'));

        var customHttpClient = new CustomHttpClient(this.httpClient); 
        return this.httpClient
        .get("http://192.168.137.1:8080/virement/justificatif", {responseType:'blob',headers:headers});
    }

    
    valider(codeVire:string,codeEmmeteur:string,codeRecepteur:string,status : string)
    {   
        var body = 
        {
          'code' : codeVire,
          'comptemetteur' : codeEmmeteur,
          'comtpedestinataire':codeRecepteur,
          'statut' : status
        };
        var headers = new HttpHeaders();
        var customHttpClient = new CustomHttpClient(this.httpClient);
        return customHttpClient.post('http://192.168.137.1:8080/virement/validRejetVirement',body,headers);
    }
}