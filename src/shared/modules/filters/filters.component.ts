import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GetParams } from '@shared/interfaces/get-params';
import { FilterType } from './shared/enums/filter-type';
import { Filter } from './shared/interfaces/filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

  readonly filterType = FilterType;

  @Input() filters: Filter[];

  @Output() update = new EventEmitter<GetParams>();

  ngOnInit(): void {
    this.onUpdate();
  }

  onUpdate(): void {
    const params: GetParams = {};
    for (const filter of this.filters) {
      params[filter.key] = String(filter.value);
    }
    this.update.emit(params);
  }
}
