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
import { Observable, pipe } from "rxjs";
import { map } from 'rxjs/operators';


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
  Data: any;
  public patient: string;
  progress: number;



  constructor(private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService,
    // tslint:disable-next-line: variable-name
    private _spinner: MatSnackBar,
    // tslint:disable-next-line: variable-name
    private _training: MatSnackBar,
    // tslint:disable-next-line: variable-name
    private _testing: MatSnackBar) { }

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
      this.hasBaseDropZoneOver = true;
      this.imageURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
    };
    this.uploader.onSuccessItem = (fileItem: FileItem) => {
      this.uploader.response.subscribe(res => {
        console.log(res);
      });
      this.router.navigateByUrl('/table');
    };
    // this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
    //   console.log(fileItem);
    // }
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


  async onSubmit() {
    this.condition = true;
    if (this.condition) {
      this.navigate();
    }

    await setTimeout(() => {
      this._testing.openFromComponent(TestingComponent, {
        duration: this.durationInSeconds * 2000,
      }),
        this.progress = 95;
    }, 8500);

    await setTimeout(() => {
      this.progress = 80;
    }, 6500);

    await setTimeout(() => {
      this.progress = 75;
    }, 4500);

    await setTimeout(() => {
      this.progress = 50;
    }, 2500);

    await setTimeout(() => {
      this.progress = 40;
    }, 500);

    this._training.openFromComponent(TrainingComponent, {
      duration: this.durationInSeconds * 2000,
    });

    this.progress = 25;

    console.log(this.patient);
    this.Data = { Name: this.patient }
    // this.http.post("http://127.0.0.1:5000/users/upload_patient", this.Data).pipe(map(res => "done")).subscribe();

  }

  navigate(): boolean {
    if (this.condition === true) {
      return true;
    } else {
      return false;
    }
  }
}
