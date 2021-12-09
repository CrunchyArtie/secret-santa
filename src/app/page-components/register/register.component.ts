import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  // Register form
  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    'password-confirmation': new FormControl('', [Validators.required, this.checkConfirmPassword('password')])
  });

  /*
   * Messages that will be shown in the mat-error elements for each type of validation error.
   */
  validationMessages = {
    'username': {
      'required': 'Le pseudo est requis.',
      'minlength': 'Le pseudo doit comporter au moins 3 caractères.',
      'maxlength': 'Le pseudo ne doit pas dépasser 30 caractères.'
    },
    'password': {
      'required': 'Le mot de passe est requis.',
      'minlength': 'Le mot de passe doit comporter au moins 8 caractères.'
    },
    'password-confirmation': {
      'required': 'Les mots de passe doit être identiques.',
      'confirmedValidator': 'Les mots de passe doit être identiques.'
    }
  };

  public customErrors: string[] = [];

  /**
   * Inject a FormBuilder for creating a FormGroup.
   */
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  onSubmit() {
    // Create a User object from the form data
    const myUser = this.registerForm.value;

    this.authenticationService.register(myUser).subscribe((response) => {
      if (response === true) {
        this.router.navigate(['/'])
      } else {
        this.handleServerError(response)
      }
    })
  }

  public getError(fieldName: string) {
    const field = this.registerForm.get(fieldName);

    if (!field) {
      return null;
    }

    const errors = field.errors;
    if (!!errors) {
      const firstErrorLabel = _.keys(errors)[0];
      return _.get(this.validationMessages, `['${fieldName}']['${firstErrorLabel}']`);
    }

    return null;
  }

  private checkConfirmPassword(targetStr: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const target = this.registerForm?.get(targetStr)

      if ((!!target) && (target.value !== control.value)) {
        return {confirmedValidator: true};
      } else {
        return null;
      }
    };
  }

  private handleServerError(responseErrors: string[]) {
    this.customErrors = responseErrors
  }
}
