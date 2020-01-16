import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderComponent } from './components/uploader/uploader.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: 'test_upload', component: UploaderComponent},
  {path: 'main', component: MainComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
