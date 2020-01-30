/*import { Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'Mandy';
  private subtitle: string;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.subtitle = 'Predict the location of fracture location from Mandible x-ray images'
  }

}*/
import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authen/authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/upload')
      },
      err => {
        console.error(err)
      }
    )
  }
}

