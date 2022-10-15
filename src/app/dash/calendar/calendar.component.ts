import { WeekDay } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Api } from '@shared/classes/api';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';
import { ApiResponse } from '@shared/interfaces/api-response';
import { Category } from '@shared/interfaces/category';
import { Transaction } from '@shared/interfaces/transaction';
import { ProfileCurrencyPipe } from '@shared/modules/profile-currency/profile-currency.pipe';
import { CalendarEvent } from 'angular-calendar';
import { startOfMonth, endOfMonth, addDays, format, subMonths, addMonths } from 'date-fns';

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
   *
   * This value is synced to query params so
   * do not update it directly use the method
   * for it {@see setViewDate};
   *
   * Note that the time zone of this date object
   * is local and we need to convert it to UTC
   * when we're making the API call.
   */
  viewDate = new Date();

  /**
   * Dict of categories.
   */
  categories: Record<number, Category> = {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private profileCurrency: ProfileCurrencyPipe) {
  }

  /**
   * Updates the {@see viewDate}, the query params
   * and loads the data again (handled in ngOnInit).
   *
   * @see viewDate
   */
  private setViewDate(date: Date): void {
    this.viewDate = date;
    this.router.navigate(['.'], {
      queryParams: { date: format(this.viewDate, Utils.QUERY_PARAMS_DATE_FORMAT_NO_DAY) },
      relativeTo: this.route,
    });
  }

  ngOnInit(): void {
    Api.category.list().subscribe((data: Category[]): void => {
      for (const category of data) {
        this.categories[category.id] = category;
      }
      /**
       * Get and watch viewing date from query params.
       */
      this.route.queryParams.subscribe((params: Params): void => {
        if (params.date) {
          this.viewDate = new Date(params.date);
        }
        this.load();
      });
    });
  }

  /**
   * Load transactions in selected month.
   *
   * We set page size to max number of transactions in
   * a single day times max number of days in a month.
   */
  load(): void {
    Api.transaction.list({
      limit: String(31 * 24),
      time_after: Utils.dateToUTCString(startOfMonth(this.viewDate)),
      time_before: Utils.dateToUTCString(addDays(endOfMonth(this.viewDate), 1)),
    }).subscribe((data: ApiResponse<Transaction>): void => {
      this.events = [];
      for (const transaction of data.results) {
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

  loadPrevMonth(): void {
    this.setViewDate(subMonths(this.viewDate, 1));
  }

  loadNextMonth(): void {
    this.setViewDate(addMonths(this.viewDate, 1));
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
        queryParams: { day: format(data.day.date, Utils.QUERY_PARAMS_DATE_FORMAT) },
      });
    }
  }
}
