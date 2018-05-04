import { Component } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './appBanquier.component.html',
  styleUrls: ['./appBanquier.component.scss']
})
export class AppBanquierComponent {
  title = 'banquier';
  constructor(private httpClient:HttpClient){}
  name : String ='';
  selectedItem : number;

  ngOnInit(){
    localStorage.setItem('token_access',"wcaQrkW4bFANSiwFKtEJDffx6g0wzsmHRJbUfb1Vzlowg2oRi6yMa9MMvuMvMa2pPIDnbSHDU8esYNVOjP2wxehAAxjn8dJXASKtPzcJPAx9PW6tGy3oOWhdwb6WAaOMWiRQ0xRN8QIiDJLd68orYthsYCdtWSDRHSWTz7MYyE44qo9aeP84qGmfdfTUZ2ZbJZ8BCvqEfmb41wRw4mwJqdvSPTaxa7m5o4HjQodLVqSLfgDnPqkU1wB7js5EvXE");
  }



}