import {Component, OnInit} from '@angular/core';

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
export class TableComponent  implements OnInit{
  displayedColumns = ['caseName', 'imageSrc', 'diagnose', 'predDiags', 'annoDiags', 'status'];
  
  dataSource : any
  

  
  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    
    this.http.get("http://localhost:5000/users/get_cases").subscribe((success) => {
        
      
      this.dataSource = success;
    });
  }

  onSubmit(){
    this.router.navigateByUrl('/annotate')
  }


}


const MOCKUP_CASES: Case[] = [
  { diagnose: ['a'] , caseName: '1', imageSrc: 'assets/images/1.png', predDiags: ['fx1', 'fx2'], annoDiags: ['fx1'], status: 'ready' },
  { diagnose: ['b'] , caseName: '2', imageSrc: 'assets/images/2.jpg', predDiags: ['fx1', 'fx2'], annoDiags: ['fx1'], status: 'ready' },
  { diagnose: ['c'] , caseName: '3', imageSrc: 'assets/images/3.jpeg', predDiags: ['fx1', 'fx2'], annoDiags: ['fx1'], status: 'ready' },
  { diagnose: ['d'] , caseName: '4', imageSrc: 'assets/images/4.jpg', predDiags: ['fx1', 'fx2'], annoDiags: ['fx1'], status: 'ready' },
  { diagnose: ['e'] , caseName: '5', imageSrc: 'assets/images/5.jpg', predDiags: ['fx1', 'fx2'], annoDiags: ['fx1'], status: 'ready' },
  { diagnose: ['f'] , caseName: '6', imageSrc: 'assets/images/6.png', predDiags: ['fx1', 'fx2'], annoDiags: ['fx1'], status: 'ready' }
];



