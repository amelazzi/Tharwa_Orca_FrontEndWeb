//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppBanquierComponent } from './appBanquier.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ChartistModule } from 'ng-chartist';
import { ListordreComponent } from './listordre/listordre.component';
import { ProfilBanquierComponent } from './profil/profil.component';
import { ListvireComponent } from './listvire/listvire.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeBanquierComponent} from './homeBanquier/homeBanquier.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'; 



@NgModule({
  declarations: [
  AppBanquierComponent,
  ProfilBanquierComponent,
  ListvireComponent,
  NavBarComponent,
  SidebarComponent,
  HomeBanquierComponent,
  ListordreComponent
],
  imports: [
    ChartistModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppBanquierComponent]
})
export class AppBanquierModule 
{
}