//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule} from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppBanquierComponent } from './appBanquier.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { ChartistModule } from 'ng-chartist';
import { ListordreComponent } from './listordre/listordre.component';
import { ListvireComponent } from './listvire/listvire.component';
import { HomeBanquierComponent} from './homeBanquier/homeBanquier.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { SidebarbanquierComponent } from './sidebarbanquier/sidebarbanquier.component'; 
import { NavbarbanquierComponent } from './navbarbanquier/navbarbanquier.component';
import { ProfileBanquierComponent } from './profilebanquier/profilebanquier.component';
import { BloquerdebloquerComponent } from './bloquerdebloquer/bloquerdebloquer.component';



@NgModule({
  declarations: [
  AppBanquierComponent,
  ListvireComponent,
  HomeBanquierComponent,
  ListordreComponent,
  NavbarbanquierComponent,
  SidebarbanquierComponent,
  ProfileBanquierComponent,
  BloquerdebloquerComponent
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