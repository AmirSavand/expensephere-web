import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WalletService {

  static get wallet(): number {
    if (localStorage.getItem('wallet')) {
      return Number(localStorage.getItem('wallet'));
    }
  }

  static set wallet(value: number) {
    localStorage.setItem('wallet', String(value));
  }

  static clear(): void {
    localStorage.removeItem('wallet');
  }
}
