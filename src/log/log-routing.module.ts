import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';





import { LoginComponent } from './login/login.component';



import {AppBanquierModule} from '../appBanquier/app.module';
import {AppBanquierComponent} from '../appBanquier/appBanquier.component';
import { ProfileBanquierComponent } from '../appBanquier/profilebanquier/profilebanquier.component';
import {HomeBanquierComponent} from '../appBanquier/homeBanquier/homeBanquier.component'
import { ListvireComponent } from '../appBanquier/listvire/listvire.component';
import { ListordreComponent } from '../appBanquier/listordre/listordre.component';






import {AppModule} from '../app/app.module';
import {AppComponent} from '../app/app.component';
import {HomeComponent} from '../app/home/home.component';
import { ProfilComponent } from '../app/profil/profil.component';
import { ListbanqueComponent } from '../app/listbanque/listbanque.component';
import { ListbanquierComponent } from '../app/listbanquier/listbanquier.component';
import { AddbanquierComponent } from '../app/addbanquier/addbanquier.component';
import { ListvirexterneComponent } from '../app/listvirexterne/listvirexterne.component';
import { AddbanqueComponent } from '../app/addbanque/addbanque.component';

const routes: Routes = [
  
  {
    path : 'gestionnaire',
    component : AppComponent,

    children:[
      { 
        path: '', 
        component: HomeComponent, 
        outlet:'popup'
      },
      { 
        path: 'dash', 
        component: HomeComponent, 
        outlet:'popup'
      },
      {
        path :'profil',
        component : ProfilComponent,
        outlet:'popup',
      },
      {
        path : 'listvirexterne',
        component : ListvirexterneComponent,
        outlet:'popup'
      },
      {
        path : 'listbanque',
        component : ListbanqueComponent,
        outlet:'popup'
      },
      {
        path : 'listbanquier',
        component : ListbanquierComponent,
        outlet:'popup'
      },
      {
        path : 'addbanque',
        component : AddbanqueComponent,
        outlet:'popup'
      },
      {
        path : 'addbanquier',
        component : AddbanquierComponent,
        outlet:'popup'
      },
    ]
  },
  {
    path : '',
    component : LoginComponent
  },






  {
    path : 'banquier',
    component : AppBanquierComponent,

    children:[
      { 
        path: '', 
        component: HomeBanquierComponent, 
        outlet:'popup'
      },
      { 
        path: 'client', 
        component: HomeBanquierComponent, 
        outlet:'popup'
      },
      {
        path :'profil',
        component : ProfileBanquierComponent,
        outlet:'popup',
      },
      {
        path : 'listvire',
        component : ListvireComponent,
        outlet:'popup'
      },
      {
        path : 'listordre',
        component : ListordreComponent,
        outlet:'popup'
      }
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule {}