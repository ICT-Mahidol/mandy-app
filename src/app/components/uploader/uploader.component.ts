import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authen/authentication.service';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})

export class UploaderComponent implements OnInit {

  uploader: FileUploader;
  uploading = false;
  hasBaseDropZoneOver = false;

  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  constructor(private http: HttpClient, private router: Router, private auth: AuthenticationService) { }





  ngOnInit() {
    this.uploader = new FileUploader({
      url: 'http://127.0.0.1:5000/users/upload_cases',
      autoUpload: true
    });
    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      this.uploading = true;
      this.hasBaseDropZoneOver = false;
      // console.log(fileItem);
    };
    this.uploader.onSuccessItem = (fileItem: FileItem) => {
      console.log(fileItem);
    };
        // this.uploader.onAfterAddingFile = (fileItem: FileItem) => {
    //   console.log(fileItem);
    // }
    this.fileUploadProgress = 'File is uploading';
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


onSubmit() {
  alert('sucessfully upload file');
  this.router.navigateByUrl('/spinner');
}
}
