import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { objectInstruction } from '@webassemblyjs/ast';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * @title Table with sticky header
 */

export interface Case {
  caseID : string;
  caseName: string;
  imageSrc: string;
  predDiags: string[];
  annoDiags: string[];
  status: string;
  diagnose: string[];
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-table',
  styleUrls: ['table.component.scss'],
  templateUrl: 'table.component.html',
})

export class TableComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router, private spinner:MatSnackBar) { }
  displayedColumns = ['caseName', 'imageSrc', 'diagnose', 'predDiags', 'annoDiags', 'status'];
  dataSource: MatTableDataSource<Case>;
  durationInSeconds = 5;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {

    this.spinner.openFromComponent(SpinnerComponent, {
      duration: this.durationInSeconds * 100,
    });

    this.http.get('https://cce516e9.ngrok.io/users/get_cases').subscribe((success) => {
    this.dataSource = new MatTableDataSource(Object.assign(success));
    this.dataSource.paginator = this.paginator;
   });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onAnnotate() {
    this.router.navigateByUrl('/annotate')
  }



}





