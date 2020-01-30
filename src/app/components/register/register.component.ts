import { Component, NgZone } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authen/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  };


  constructor(private auth: AuthenticationService, private router: Router) {}
  
  register() {
    
    this.auth.register(this.credentials).subscribe(
      () => {
        console.log("eiei");
        this.router.navigateByUrl('/login');
        
      },
      err => {
        console.error(err);
      }
    );
  }
}