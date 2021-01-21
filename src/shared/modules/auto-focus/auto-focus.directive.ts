import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'input[appAutoFocus]',
})
export class AutoFocusDirective implements OnInit {

  constructor(private element: ElementRef) {
    if (!element.nativeElement.focus) {
      throw new Error('Element does not accept focus.');
    }
  }

  get input(): HTMLInputElement {
    return this.element.nativeElement;
  }

  ngOnInit(): void {
    setTimeout((): void => {
      this.input.focus();
      this.input.select();
    });
  }
}
