import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { InfoComponent } from './components/management/info/info.component';
import { DetailComponent } from './components/management/detail/detail.component';
import { DeviceComponent } from './components/management/device/device.component';
import { UserComponent } from './components/management/user/user.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'management/:name', component: ManagementComponent,
    children: [
      { path: 'info', component: InfoComponent },
      { path: 'detail', component: DetailComponent },
      { path: 'device', component: DeviceComponent },
      { path: 'user', component: UserComponent },
      { path: '**', redirectTo: 'info' }
    ]
  },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
