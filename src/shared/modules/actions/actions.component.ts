import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Action } from './shared/interfaces/action';
import { ActionData } from './shared/interfaces/action-data';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnChanges {

  @Input() actions: Action[];

  @Input() disableAction: boolean;

  @Input() disable: boolean;

  @Output() selection = new EventEmitter<ActionData>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disable && changes.disable.currentValue !== null) {
      this.disable = changes.disable.currentValue;
    }
  }

  select(action: Action, value?: any): void {
    this.selection.emit({ action, value });
  }
}
