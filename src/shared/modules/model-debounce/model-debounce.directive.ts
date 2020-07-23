import { Directive, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { skip, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appModelDebounce]',
})
export class ModelDebounceDirective implements OnDestroy {

  @Output() debouncedChange = new EventEmitter<string>();

  @Input() debouncedChangeTime = 500;

  subscription: Subscription;

  constructor(private ngModel: NgModel) {
    this.subscription = this.ngModel.control.valueChanges.pipe(
      skip(1),
      distinctUntilChanged(),
      debounceTime(this.debouncedChangeTime),
    ).subscribe((value: string): void => this.debouncedChange.emit(value));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}

