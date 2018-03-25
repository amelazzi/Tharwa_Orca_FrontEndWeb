import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {Service} from './login.service';

import { HttpHeaders, HttpClient , HttpClientModule } from '@angular/common/http';

fdescribe ('Service ', () =>
{
  let httpMock : HttpTestingController;
  let service : Service;

  const endpoint = "https://auththarwa.cleverapps.io/oauth/code";
  
  const response = { succe: "l'utilisateur est verifie"};

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [Service]
    });

    service = TestBed.get(Service);
    httpMock = TestBed.get(HttpTestingController);
  });
  
  it('devrait envoyer une requete d\'authentification d\' gestionnaire',()=>
  {

    service.authentifier().subscribe(
    data=> {
      console.log(data);
    });

    const requete = httpMock.expectOne(endpoint);
    httpMock.verify();
    expect(requete.request.method).toBe('POST');
    expect(requete.request.body).toBe("userId=test_tharwa@mailinator.com&Pwd=orca@2018&code=0");

    expect(response).toBeTruthy();
    requete.flush(response);


  });

});