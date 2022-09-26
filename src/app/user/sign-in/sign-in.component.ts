import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  /**
   * Sign in form data
   */
  form: ReactiveFormData = {
    error: {},
  };

  constructor(private formBuilder: UntypedFormBuilder,
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
      password: ['', Validators.required],
    });
  }

  /**
   * Submit sign-in form and authenticate
   */
  submit(): void {
    this.form.loading = true;
    this.auth.signIn(this.form.form.value).subscribe((): void => {
    }, (error: HttpErrorResponse): void => {
      this.form.loading = false;
      this.form.error = error.error;
    });
  }
}
