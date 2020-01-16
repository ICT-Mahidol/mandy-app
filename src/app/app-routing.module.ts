import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploaderComponent } from './components/uploader/uploader.component';


const routes: Routes = [
  {path: 'test_upload', component: UploaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
