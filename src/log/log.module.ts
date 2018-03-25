//import { BrowserModule } from '@angular/platform-browser';


import {CommonModule} from '@angular/common'; 

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogRoutingModule } from './log-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogComponent } from './log.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ChartistModule } from 'ng-chartist';

import { AppModule } from '../app/app.module';
import { HomeComponent } from '../app/home/home.component'
import { SidebarComponent } from '../app/sidebar/sidebar.component'
import { LoginComponent } from './login/login.component';
import { AppBanquierModule } from '../appBanquier/app.module';





@NgModule({
  declarations: [
    LogComponent,
    LoginComponent    
  ],
  imports: [
    ReactiveFormsModule,
    AppModule,
    AppBanquierModule,
    ChartistModule,
    BrowserAnimationsModule,
    CommonModule,
    LogRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [LogComponent]
})
export class LogModule 
{
}