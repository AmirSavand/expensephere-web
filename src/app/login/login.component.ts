import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  /**
   * Login form data
   */
  form: ReactiveFormData = {
    error: {},
  };

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    /**
     * Redirect if already logged in
     */
    if (AuthService.isAuth()) {
      this.router.navigateByUrl(AuthService.SIGN_IN_REDIRECT);
    }
    /**
     * Setup login form
     */
    this.form.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Submit login form and authenticate
   */
  submit(): void {
    this.form.loading = true;
    this.auth.signIn(this.form.form.value).subscribe((): void => {
    }, (error: HttpErrorResponse): void => {
      this.form.loading = false;
      console.log(error);
      this.form.error = error.error;
    });
  }
}
