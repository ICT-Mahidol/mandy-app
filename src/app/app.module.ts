import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FileUploadModule } from 'ng2-file-upload';
import { MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploaderComponent } from './components/uploader/uploader.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from '../app/components/authen/authentication.service';
import { AuthGuardService } from '../app/components/authen/auth-guard.service';
import { ProfileComponent} from '../app/components/profile/profile.component';
import {RegisterComponent} from '../app/components/register/register.component';
import {TableComponent} from '../app/components/table/table.component';
import {HomeComponent} from '../app/components/home/home.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
//import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    UploaderComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TableComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FileUploadModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatTabsModule,
    MatExpansionModule,
    MatStepperModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressSpinnerModule


  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
