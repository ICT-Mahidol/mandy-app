import { Component} from '@angular/core';

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

}
