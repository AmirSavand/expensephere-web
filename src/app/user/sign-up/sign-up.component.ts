import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  /**
   * Sign up form data
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
     * Setup sign-in form
     */
    this.form.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Submit sign-in form and authenticate
   */
  submit(): void {
    this.form.loading = true;
    this.auth.signUp(this.form.form.value).subscribe((): void => {
    }, (error: HttpErrorResponse): void => {
      this.form.loading = false;
      this.form.error = error.error;
    });
  }
}
