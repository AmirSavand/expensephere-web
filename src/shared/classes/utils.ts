import { Color } from '@shared/classes/color';
import { icons } from '@shared/constants/icons';
import { SelectItem } from '@shared/modules/select/shared/interfaces/select-item';

export class Utils {

  /**
   * API datetime format for HTML native datetime-local.
   */
  static readonly HTML_DATETIME_FORMAT = 'yyyy-MM-ddTHH:mm';

  /**
   * @returns A random item from the given list
   */
  static getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }

  /**
   * @returns List of icons as {@see SelectItem} list for {@see SelectModule}
   */
  static getSelectItemFromIcons(): SelectItem[] {
    const output: SelectItem[] = [];
    for (const icon of icons) {
      output.push({
        id: icon,
        color: Color.COLORS_RESERVED.default,
        icon,
        name: icon.toUpperCase().replace(/-/g, ' '),
      });
    }
    return output;
  }
}
