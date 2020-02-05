import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    
  }
  onSubmit() {
    
    alert("Result is ready!!")
    this.router.navigateByUrl('/table');
  }
  

}
