import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

/**
 * @title Table with sticky header
 */
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})

export class TableComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }
  displayedColumns = ['caseName', 'imageSrc', 'diagnose', 'predDiags', 'annoDiags', 'status'];
  
  
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  ngOnInit() {
    this.http.get("http://localhost:5000/users/get_cases").subscribe((success) => {
    this.dataSource = success;
   
    });
  }
 
  onAnnotate() {
    this.router.navigateByUrl('/annotate')
  }



}





