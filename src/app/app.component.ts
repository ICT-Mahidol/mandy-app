import { Component } from '@angular/core';
import { AuthenticationService } from '../app/components/authen/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mandy';

  private subtitle: string;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.subtitle = 'Predict the location of fracture location from Mandible x-ray images'
    this.router.navigateByUrl('/home');
  }

  constructor(public auth: AuthenticationService,private router: Router) {}


}
