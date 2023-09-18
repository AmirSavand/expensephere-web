import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

  constructor(private _snackBar : MatSnackBar) {
  }
  openSnackBar(name:string) {
    this._snackBar.open(name + ' created successfully!', 'close');
  }

}
