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
  subtitle: string;
  ngOnInit() {
    this.subtitle = 'Predict the fracture name and location from Mandible x-ray images';
  }
  constructor(private auth: AuthenticationService, private router: Router) { }

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

