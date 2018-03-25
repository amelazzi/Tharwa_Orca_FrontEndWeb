import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { async, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {Service} from './app.service';

fdescribe('AppComponent', () => {

  let httpMock : HttpTestingController;
  let service : Service;
  let token : String;

  const response = { 
    userId: "test_tharwa@mailinator.com",
    userName : "test tharwa"
  };

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [Service]
    });

    service = TestBed.get(Service);
    httpMock = TestBed.get(HttpTestingController);
  });
  
  it('devrait envoyer une requete pour savoir récupérer les infos du token',() =>
  {
    service.getTokenInfo(token)
    .subscribe( data =>
    {
      console.log(data);
    }
    );

    const requete = httpMock.expectOne("http://api-tharwaa.cleverapps.io/users/dashBoard");
    expect(requete.request.method).toBe('GET');
    requete.flush(response);
  });

});
