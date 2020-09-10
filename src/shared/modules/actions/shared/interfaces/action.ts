import { ActionValue } from './action-value';

export interface Action {
  label: string;
  values?: ActionValue[];
}
