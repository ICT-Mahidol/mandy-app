import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FileUploadModule } from 'ng2-file-upload';
import { MatIconModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploaderComponent } from './components/uploader/uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FileUploadModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
