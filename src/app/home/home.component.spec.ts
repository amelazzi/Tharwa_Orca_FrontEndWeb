import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {Service} from './home.service';

import { HttpHeaders, HttpClient , HttpClientModule } from '@angular/common/http';

describe ('Service ', () =>
{
  let httpMock : HttpTestingController;
  let service : Service;

  const endpoint = "https://auththarwa.cleverapps.io/oauth/login";
  
  const response = { 
    access_token: "3QNd9qB7GPrNk9g79OJ5kGqL9hYhxUdnnSDgYeHkbejGN0Tt2ELHrJ0Bpx6Xo2jXd4O0MQzvzLY4gQWv87F3j4"+
    +"Fr5Vfg1UQRvtrj76cddN4Zwu2Dh1N5oNpep6rqcKAELGFeLVx9oACZT6iVZYCK0QrPe0GH1v7rzo6GMIqflgto7rgUJfuUYEOOtPq"+
    +"iHmqsHoo85On9gYW3CprRrWo6nBXvjQlFi5VUTwT96Yl7ocfncqqblhI1VnrcUJ8Usqp",
    
    refresh_token : "5hOAIVzMGt7HYAh0U03Oomb7HSsfTaNi7Af2Gez6uuLQL4as0CHsmEWAQnLRBH5Lzgz9iG3gn3MVzlS2cnHkld"+
    +"T0TxPZc5PNbCAeQUQHFA2O2lJZqg7aAy62y7ADGNlYwbHUcOIVIglXXjYnmmcSCnS5oKSwQQBowYS5IpIFvFWwU5Z1SnGghQW1cj5G2"+
    +"GoqVzTOl8HFKOiYbPjaUIPyrMvCOc5J4HVMjLah8y9St502FaDKBx956KLipH1lRnz",

    expires_in: 3600,
    token_type: "Bearer"
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


  


  it('devrait retourné si la vaeur du blur (flou) est a vrai ou faux',()=>
  {
    let blur = service.getBlurState();
    expect(blur).toBeFalsy();
  });


  it('devrait envoyer une requete pour vérifier le code entré',()=>
  {
    service.tryDeleteBlur()
    .subscribe( data =>
    {
      console.log(data);
    }
    );

    const requete = httpMock.expectOne(endpoint);
    expect(requete.request.method).toBe('POST');
    requete.flush(response);

  });

});