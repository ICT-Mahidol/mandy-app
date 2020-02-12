import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authen/authentication.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private router:Router, public auth: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.router.navigateByUrl('/table');
  }

}
