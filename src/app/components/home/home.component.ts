import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {

  constructor() { }

  title = 'WELCOME TO MANDY';
  private subtitle: string;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.subtitle = 'Locations of Mandibular Fracture';
  }

}
