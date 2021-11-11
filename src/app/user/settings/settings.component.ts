import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { Api } from '@shared/classes/api';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { User } from '@shared/interfaces/user';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  readonly faBack: IconDefinition = faArrowLeft;

  /**
   * User data
   */
  user: User;

  /**
   * Settings form
   */
  form: ReactiveFormData = {
    error: {},
  };

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      display_name: [''],
    });
    /**
     * Get user data and fill the form with it
     */
    AuthService.user.subscribe((user: User): void => {
      this.user = user;
      if (user) {
        this.form.form.get('display_name').setValue(user.account.name);
      }
    });
  }

  /**
   * Update user settings
   */
  submit(): void {
    this.form.loading = true;
    Api.account.update(this.user.username, this.form.form.value).subscribe((data: Account): void => {
      this.form.loading = false;
      AuthService.setUser(Object.assign(this.user, { account: data }));
    }, (error: HttpErrorResponse): void => {
      this.form.loading = false;
      this.form.error = error.error;
    });
  }
}
