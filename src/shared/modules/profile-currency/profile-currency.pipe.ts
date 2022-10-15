import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ProfileService } from '@shared/services/profile.service';

@Pipe({
  name: 'profileCurrency',
})
export class ProfileCurrencyPipe extends CurrencyPipe implements PipeTransform {
  override transform(
    value: number,
    currencyCode?: string,
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string,
    locale?: string,
  ): string | any {
    return super.transform(
      value,
      currencyCode || ProfileService.profile.value.currency,
      'symbol-narrow',
      digitsInfo,
      locale,
    );
  }
}
