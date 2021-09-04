import { Component, OnInit, Input } from '@angular/core';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { Category } from '@shared/interfaces/category';
import { MetricSpent } from '@shared/interfaces/metric-spent';
import { PK } from '@shared/types/pk';
import { addDays } from 'date-fns';

@Component({
  selector: 'app-metric-spent-category',
  templateUrl: './metric-spent-category.component.html',
  styleUrls: ['./metric-spent-category.component.scss'],
})
export class MetricSpentCategoryComponent implements OnInit {

  readonly style = Color.style;

  @Input() categories: Category[];

  categoryDict: Record<PK, Category>;

  metrics: MetricSpent[];

  ngOnInit(): void {
    this.categoryDict = Utils.getDictOfList(this.categories);
    Api.category.action<MetricSpent[]>('metric-spent', {
      time_after: Utils.dateToUTCString(addDays(new Date(), -30)),
    }).subscribe((data: MetricSpent[]): void => {
      /** Filter out items without values and sort by higher values first. */
      this.metrics = data
        .filter((item: MetricSpent): boolean => Boolean(item.value))
        .sort((a: MetricSpent, b: MetricSpent): number => b.value - a.value);
    });
  }
}
