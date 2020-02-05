import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderComponent } from './components/uploader/uploader.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import {TableComponent} from './components/table/table.component';
import {HomeComponent} from './components/home/home.component';
import {SpinnerComponent} from './components/spinner/spinner.component';

import { AuthGuardService } from '../app/components/authen/auth-guard.service';
import { ProfileComponent} from '../app/components/profile/profile.component';
import {RegisterComponent} from '../app/components/register/register.component';
import {AnnotateComponent} from '../app/components/annotate/annotate.component';

const routes: Routes = [
{path: 'upload', component: UploaderComponent, canActivate: [AuthGuardService]},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'table', component: TableComponent, canActivate: [AuthGuardService]},
  {path: 'spinner', component: SpinnerComponent, canActivate: [AuthGuardService]},
  {path: 'annotate', component: AnnotateComponent}

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

