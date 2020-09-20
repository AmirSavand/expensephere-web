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

  ngOnInit(): void {
    const input: HTMLInputElement = this.element.nativeElement as HTMLInputElement;
    input.focus();
    input.select();
  }
}
