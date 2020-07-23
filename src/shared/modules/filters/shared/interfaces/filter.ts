import { FilterType } from '../enums/filter-type';
import { FilterListValue } from './filter-list-value';

export interface Filter {
  type: FilterType;
  label: string;
  key: string;
  value: string | boolean | number;
  values?: FilterListValue[];
}
