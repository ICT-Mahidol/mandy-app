import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  uploader: FileUploader;
  uploading = false;
  hasBaseDropZoneOver = false;

  constructor() { }

  ngOnInit() {
    this.uploader = new FileUploader({
      url: 'http://127.0.0.1:5000/upload_cases',
      autoUpload: true
    });
    this.uploader.onBeforeUploadItem = (fileItem: FileItem) => {
      this.uploading = true;
      this.hasBaseDropZoneOver = false;
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

}
