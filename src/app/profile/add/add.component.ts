import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Currency } from '@shared/interfaces/currency';
import { Profile } from '@shared/interfaces/profile';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  form: ReactiveFormData = {
    error: {},
  };

  currencies: Currency[];

  constructor(private api: ApiService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      name: ['Me', Validators.required],
      currency: [null, Validators.required],
      note: [null],
    });
    /**
     * Get list of currencies
     */
    this.api.currency.list().subscribe((data: Currency[]): void => {
      this.currencies = data;
    });
  }

  submit(): void {
    this.form.loading = true;
    this.api.profile.create(this.form.form.value).subscribe((data: Profile): void => {
      ProfileService.profiles = ProfileService.profiles.concat(data);
      ProfileService.profile = data;
      this.router.navigateByUrl('/');
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
  }
}
