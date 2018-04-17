import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {Service} from './addbanquier.service';

import { HttpHeaders, HttpClient , HttpClientModule } from '@angular/common/http';

fdescribe ('Service ', () =>
{
  let httpMock : HttpTestingController;
  let service : Service;

  const endpoint = "http://api-tharwaa.cleverapps.io/users/BankerInscription";

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [Service]
    });

    service = TestBed.get(Service);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('devrait envoyer une requete pour récupérer la liste des virements externes',()=>
  {
      service.tryDeleteBlur()
      .subscribe( data =>
      {
        console.log(data);
      }
    );

    const requete = httpMock.expectOne(endpoint);
    expect(requete.request.method).toBe('POST');
  });
});