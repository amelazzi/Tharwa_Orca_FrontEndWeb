import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {Service} from './listvire.service';

import { HttpHeaders, HttpClient , HttpClientModule } from '@angular/common/http';

fdescribe ('Service ', () =>
{
  let httpMock : HttpTestingController;
  let service : Service;

  const endpoint1 = "http://192.168.43.64/virement/validRejetVir";
  const endpoint = "http://192.168.43.64/virement/ListVirementNonTraites";

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [Service]
    });

    service = TestBed.get(Service);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('devrait envoyer une requete pour récupérer la liste des virements non encore traités',()=>
  {
    service.getVirement()
    .subscribe( data =>
    {
      console.log(data);
    }
    );

    const requete = httpMock.expectOne(endpoint);
    expect(requete.request.method).toBe('GET');
  });




  it('devrait envoyer une requete pour valider ou rejeter un compte',()=>
  {
    let status : string;
    var retour = "";
    status = '1';
    if(status ==="1")
    {
      retour = "virement valide avec succes";
    }
    else
    {
      retour = "virement rejeté avec succes";
    }
    service.valider("TWH0004DZD",status)
    .subscribe( data =>
    {
      expect(retour).toBe("virement valide avec succes");
    }
    );

    const requete = httpMock.expectOne(endpoint1);
    expect(requete.request.method).toBe('POST');
    
  });


});