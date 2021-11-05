import { Component } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
})
export class PublicComponent {
  readonly home = environment.home;
}
