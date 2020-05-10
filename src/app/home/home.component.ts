import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCubes } from '@fortawesome/free-solid-svg-icons/faCubes';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import { Color } from '@shared/classes/color';
import { Category } from '@shared/interfaces/category';
import { ApiService } from '@shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  readonly faSample: IconDefinition = faMoneyBill;

  style = Color.style;

  categories: Category[];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.category.list().subscribe((data: Category[]): void => {
      this.categories = data;
    });
  }
}
