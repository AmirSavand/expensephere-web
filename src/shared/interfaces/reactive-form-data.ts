import { UntypedFormGroup } from '@angular/forms';
import { PK } from '@shared/types/pk';
import { ApiError } from './api-error';

/**
 * Reactive form object for API.
 */
export interface ReactiveFormData<T = any> {
  /* Actual API ID. Used for knowing if it's for edit or create. */
  id?: PK;
  /* Form group data for this object. */
  form?: UntypedFormGroup;
  /* Used for API loading indicator. */
  loading?: boolean;
  /* Used for error reporting. */
  error: ApiError;
  /* Used to know about certain errors. */
  errorStatus?: number;
  /* Used to know if API call is succeeded. */
  success?: boolean;
  /* Raw data of this form actual object from API. */
  data?: T;
  /* Whether this for is in view mode. */
  viewMode?: boolean;
}
