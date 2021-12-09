import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  public customErrors: string[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  public onSubmit() {
    this.customErrors = [];
    this.authenticationService.login(this.loginForm.value).subscribe((response) => {
      if(response === true) {
        this.router.navigate(['/']);
      } else {
        this.handleServerError(response);
      }
    })
  }

  private handleServerError(responseErrors: string[]) {
    this.customErrors = responseErrors
  }
}
