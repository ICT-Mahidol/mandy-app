import { Component, OnInit } from '@angular/core';

import { Case } from '../models/models';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';


/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})
// tslint:disable-next-line: component-class-suffix
export class TableComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }
  displayedColumns = ['caseName', 'imageSrc', 'diagnose', 'predDiags', 'annoDiags', 'status'];

  dataSource: any


  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  case: Case
  // MatPaginator Output


  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
  ngOnInit() {

    this.http.get("http://localhost:5000/users/get_cases").subscribe((success) => {
    this.dataSource = success;
    });
  }

  onAnnotate() {
    this.router.navigateByUrl('/annotate')
  }



}





