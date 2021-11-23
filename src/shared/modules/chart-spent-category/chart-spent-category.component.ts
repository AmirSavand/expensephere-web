import { Component, OnInit, Input } from '@angular/core';
import { Api } from '@shared/classes/api';
import { Utils } from '@shared/classes/utils';
import { Category } from '@shared/interfaces/category';
import { MetricSpent } from '@shared/interfaces/metric-spent';
import { PK } from '@shared/types/pk';
import { addDays } from 'date-fns';

@Component({
  selector: 'app-chart-spent-category',
  templateUrl: './chart-spent-category.component.html',
  styleUrls: ['./chart-spent-category.component.scss'],
})
export class ChartSpentCategoryComponent implements OnInit {

  /** Maximum number of categories to show. */
  @Input() maxChartItems = 6;

  /** Category list is required since API returns PKs only. */
  @Input() categories: Category[];

  /** Metrics data, if given, we'll not load it from the API. */
  @Input() metrics?: MetricSpent[];

  /** Dict of categories data mapped to their PKs. */
  categoryDict: Record<PK, Category>;

  /** Results for the chart. */
  chartResults: { name: string; value: number }[];

  /** Colors for the chart. */
  chartColors: { name: string; value: string }[];

  private generate(): void {
    /** Sort metrics by value. */
    let data = this.metrics.sort((a: MetricSpent, b: MetricSpent) => b.value - a.value);
    /** Limit metrics by {@see maxChartItems} items. */
    data = data.splice(0, this.maxChartItems);
    /** Setup out chart results and colors. */
    this.chartResults = [];
    this.chartColors = [];
    /** Add each category to the chart. */
    for (const item of data) {
      const category: Category = this.categoryDict[item.id];
      this.chartResults.push({ name: category.name, value: item.value });
      this.chartColors.push({ name: category.name, value: category.color });
    }
  }

  ngOnInit(): void {
    /** Generate category dict. */
    this.categoryDict = Utils.getDictOfList(this.categories);
    /** Do we have metrics? Let's load and generate. */
    if (!this.metrics) {
      /** Load category metric spent filtered by last 30 days. */
      Api.category.action<MetricSpent[]>('metric-spent', {
        time_after: Utils.dateToUTCString(addDays(new Date(), -30)),
      }).subscribe((data: MetricSpent[]): void => {
        this.metrics = data;
        this.generate();
      });
    }
    /** We do, let's generate. */
    else {
      this.generate();
    }
  }
}
