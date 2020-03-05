import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authen/authentication.service';
import { timeout } from 'rxjs/operators';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TrainingComponent } from '../training/training.component';
import { TestingComponent } from '../testing/testing.component';



@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})

export class UploaderComponent implements OnInit {

  uploader: FileUploader;
  uploading = false;
  hasBaseDropZoneOver = false;
  imageURL: SafeUrl;
  response: string;

  public patient: string;
  

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private router: Router, private auth: AuthenticationService, private _spinner: MatSnackBar, private _training: MatSnackBar, private _testing: MatSnackBar) { }

  durationInSeconds = 5;

  private condition: boolean;
  private message: string;


  ngOnInit() {

    this.uploader = new FileUploader({
      url: 'http://127.0.0.1:5000/users/upload_cases',
      autoUpload: true
    });
    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      this.uploading = true;
      this.hasBaseDropZoneOver = false;
      this.imageURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
    };
    this.uploader.onSuccessItem = (fileItem: FileItem) => {
      console.log(fileItem);

    };
    // this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
    //   console.log(fileItem);
    // }
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );
    
  }

  fileOver(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.hasBaseDropZoneOver = true;
    return false;
  }

  fileLeave(e: any) {
    e.stopPropagation();
    e.preventDefault();

    if (e.clientX === 0 || e.clientY <= 96) {
      this.hasBaseDropZoneOver = false;
    }
    return false;
  }

  get hasFileOver(): boolean {
    return this.hasBaseDropZoneOver;
  }


  onSubmit(){
    this.condition = true;
    if (this.condition)
    {
      this.navigate()
    }
  setTimeout(() => {
      this._testing.openFromComponent(TestingComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }, 1000);

  this._training.openFromComponent(TrainingComponent, {
      duration: this.durationInSeconds * 1000,
    });
    console.log(this.patient);
  }

  navigate(): boolean {
    if (this.condition == true) {
      return true;
    }
    else{
      return false;
    }
  }


  onResult() {

    this._testing.openFromComponent(SpinnerComponent, {
      duration: this.durationInSeconds * 5,
    });

  }
}
