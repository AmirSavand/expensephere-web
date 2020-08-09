import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ProfileService } from '@shared/services/profile.service';

@Pipe({
  name: 'profileCurrency',
})
export class ProfileCurrencyPipe extends CurrencyPipe implements PipeTransform {
  transform(value: number, currency?: string): string {
    return super.transform(value, currency || ProfileService.profile.value.currency, 'symbol-narrow');
  }
}
