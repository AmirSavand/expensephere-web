/**
 * UI color handling for categories, transactions, profiles, etc.
 */
export class Color {

  /**
   * Background color lighten amount
   */
  private static readonly LIGHTEN_AMOUNT: string = '22';

  /**
   * Predefined colors for user to select
   */
  static readonly COLORS: string[] = [
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
    '#cddc39',
    '#ffeb3b',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#795548',
    '#9e9e9e',
    '#607d8b',
  ];

  /**
   * @returns Lighten amount of a color
   */
  static lighten(color: string): string {
    return `${color}${Color.LIGHTEN_AMOUNT}`;
  }

  /**
   * Return color and background CSS properties
   */
  static style(color: string): { color: string, background: string } {
    return { color, background: Color.lighten(color) };
  }
}
