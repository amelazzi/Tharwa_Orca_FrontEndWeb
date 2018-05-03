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
        headers = headers.append("token", "EWVkyX9tlGFag9uqkMuW7JWiz9UGRfWnHtPQd3EL7cbfopJTKt15xEZc5ul0VkPyycMx3JGgDLT988tQNp1LwkBS0LuZpmSyWcqQpdsYU6W05OcfITrHHoqVLpIxeRWWOcYkcKYcHKdfI7uo0DtAEtrV5Z16Zn8BDf2Qfbxpog7ptRdJWk3tVZqPveYTYYSXzDQdRyb6j2kN9FPXN00wl12vqX9JewEDk7ZXiNCGxffKqhc4ytjsUHUa0TI944p");

        return this.httpClient.get('http://192.168.101.1:8080/virement/ListVirementNonTraites',{headers:headers})
    }

    
    valider(codeVire:string,status : string)
    {
        var userMail : String;
        var code :number;
        
        let headers = new HttpHeaders();

        //headers = headers.append("token",localStorage.getItem('token_access'));
        headers = headers.append("token", "EWVkyX9tlGFag9uqkMuW7JWiz9UGRfWnHtPQd3EL7cbfopJTKt15xEZc5ul0VkPyycMx3JGgDLT988tQNp1LwkBS0LuZpmSyWcqQpdsYU6W05OcfITrHHoqVLpIxeRWWOcYkcKYcHKdfI7uo0DtAEtrV5Z16Zn8BDf2Qfbxpog7ptRdJWk3tVZqPveYTYYSXzDQdRyb6j2kN9FPXN00wl12vqX9JewEDk7ZXiNCGxffKqhc4ytjsUHUa0TI944p");

        var body = 
        {
          'code' : "String",
          'statut' : "String"
        };

        body.code = codeVire;
        body.statut = status;
        
        return this.httpClient.post('http://192.168.0.39:8088/virement/validRejetVir',body,{headers:headers})
    }

}