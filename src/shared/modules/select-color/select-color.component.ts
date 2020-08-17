import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { Color } from '@shared/classes/color';
import { Utils } from '@shared/classes/utils';

@Component({
  selector: 'app-select-color',
  templateUrl: './select-color.component.html',
  styleUrls: ['./select-color.component.scss'],
})
export class SelectColorComponent implements OnInit {

  readonly faClose: IconDefinition = faTimes;

  readonly colors: string[] = Color.COLORS;
  readonly lighten = Color.lighten;

  /**
   * Selected color
   */
  @Input() selected: string;

  /**
   * On color selection event
   */
  @Output() choose = new EventEmitter<string>();

  /**
   * Is selecting color?
   * Used for color selection status (open or closed).
   */
  isSelecting: boolean;

  ngOnInit(): void {
    /**
     * Set default value to random color.
     */
    if (!this.selected) {
      this.selected = Utils.getRandomItemFromList(Color.COLORS);
      this.choose.emit(this.selected);
    }
  }
}
