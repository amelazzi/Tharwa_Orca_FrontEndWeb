import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {Service} from './listBanque.service';

import { HttpHeaders, HttpClient , HttpClientModule } from '@angular/common/http';

describe ('Service ', () =>
{
  let httpMock : HttpTestingController;
  let service : Service;

  const endpoint = "http://api-tharwaa.cleverapps.io/gestionnaire/listBanque";

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [Service]
    });

    service = TestBed.get(Service);
    httpMock = TestBed.get(HttpTestingController);
  });




});