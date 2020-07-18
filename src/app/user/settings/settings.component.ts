import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { User } from '@shared/interfaces/user';
import { ApiService } from '@shared/services/api.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  /**
   * User details
   */
  user: User;

  /**
   * Settings form data
   */
  form: ReactiveFormData = {
    error: {},
  };

  constructor(private formBuilder: FormBuilder,
              private api: ApiService) {
  }

  ngOnInit(): void {
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      display_name: [''],
    });
    /**
     * User data
     */
    AuthService.user.subscribe((user: User): void => {
      this.user = user;
      this.form.form.get('display_name').setValue(user.account.name);
    });
  }

  /**
   * Update user details
   */
  submit(): void {
    this.form.loading = true;
    this.api.account.update(this.user.username, this.form.form.value).subscribe((data: Account): void => {
      this.form.loading = false;
      AuthService.setUser(Object.assign(this.user, { account: data }));
    });
  }
}
