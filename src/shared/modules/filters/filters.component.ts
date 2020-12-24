import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import { GetParams } from '@shared/interfaces/get-params';
import { FilterType } from './shared/enums/filter-type';
import { Filter } from './shared/interfaces/filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {

  readonly faToggle: IconDefinition = faFilter;

  readonly filterType = FilterType;

  @Input() filters: Filter[];

  @Output() update = new EventEmitter<GetParams>();

  /**
   * Filters expand/collapse status. Mobile only.
   */
  expand = false;

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
