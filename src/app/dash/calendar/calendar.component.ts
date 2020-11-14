import { WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { ProfileCurrencyPipe } from '@shared/modules/profile-currency/profile-currency.pipe';
import { ApiService } from '@shared/services/api.service';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    ProfileCurrencyPipe,
  ],
})
export class CalendarComponent implements OnInit {

  readonly faPrev: IconDefinition = faArrowLeft;
  readonly faNext: IconDefinition = faArrowRight;

  /**
   * Calendar events that includes transactions.
   */
  events: CalendarEvent[] = [];

  /**
   * Current calendar view date.
   */
  viewDate: Moment = moment();

  /**
   * Dict of categories.
   */
  categories: Record<number, Category> = {};

  constructor(private api: ApiService,
              private router: Router,
              private profileCurrency: ProfileCurrencyPipe) {
  }

  ngOnInit(): void {
    this.api.category.list().subscribe((data: Category[]): void => {
      for (const category of data) {
        this.categories[category.id] = category;
      }
      this.load();
    });
  }

  /**
   * Load transactions in selected month.
   */
  load(): void {
    this.api.transaction.list({
      time_after: moment(this.viewDate).startOf('month').format(Utils.API_DATE_FORMAT_MOMENT),
      time_before: moment(this.viewDate).endOf('month').add(1, 'day').format(Utils.API_DATE_FORMAT_MOMENT),
    }).subscribe((data: Transaction[]): void => {
      this.events = [];
      for (const transaction of data) {
        const category: Category = this.categories[transaction.category];
        this.events.push({
          id: transaction.id,
          start: new Date(transaction.time),
          title: `${this.profileCurrency.transform(transaction.amount)} - ${transaction.note || category.name}`,
          color: {
            primary: category.color,
            secondary: Color.lighten(category.color),
          },
        });
      }
    });
  }

  /**
   * When clicked on an event, redirect to transaction page.
   */
  onEventClick(data: { event: CalendarEvent }) {
    this.router.navigate(['/dash', 'transaction', data.event.id]);
  }

  /**
   * When clicked on a day, redirect to transactions page filtered by that day.
   */
  onDayClick(data: { day: WeekDay | any }) {
    if (data.day.events.length) {
      this.router.navigate(['/dash', 'transaction', 'list'], {
        queryParams: { day: moment(data.day.date).format(Utils.API_DATE_FORMAT_MOMENT) },
      });
    }
  }
}
