import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  title = 'WELCOME TO MANDY';
  private subtitle: string;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.subtitle = '-'
  }

}
