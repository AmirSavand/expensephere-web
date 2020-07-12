import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Color } from '@shared/classes/color';
import { icons } from '@shared/constants/icons';
import { ReactiveFormData } from '@shared/interfaces/reactive-form-data';
import { ApiService } from '@shared/services/api.service';
import { ProfileService } from '@shared/services/profile.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {

  /**
   * Colors for selection
   */
  readonly colors = Color.COLORS;

  /**
   * Icons for selection
   */
  readonly icons = icons;

  form: ReactiveFormData = {
    error: {},
  };

  constructor(private api: ApiService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    /**
     * Setup the form
     */
    this.form.form = this.formBuilder.group({
      profile: [ProfileService.profile.id],
      name: [null, Validators.required],
      color: [null, Validators.required],
      icon: [null, Validators.required],
    });
  }

  submit(): void {
    this.form.loading = true;
    this.api.wallet.create(this.form.form.value).subscribe((): void => {
      this.router.navigateByUrl('/user/wallet/list');
    }, ((error: HttpErrorResponse): void => {
      this.form.error = error.error;
      this.form.loading = false;
    }));
  }
}
