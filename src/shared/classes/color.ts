/**
 * UI color handling for categories, transactions, profiles, etc.
 */
export class Color {

  /**
   * Background color lighten amount
   */
  private static readonly LIGHTEN_AMOUNT = '22';

  /**
   * Predefined colors for user to select
   * Color shades: 500 - 900 - A 400
   * Total colors: 54
   */
  static readonly COLORS: string[] = [
    '#ff4038', '#b71c1c', '#FF1744',
    '#e91e63', '#880e4f', '#f50057',
    '#9c27b0', '#4a148c', '#d500f9',
    '#673ab7', '#311b92', '#651fff',
    '#3f51b5', '#1a237e', '#3d5afe',
    '#2196f3', '#0d47a1', '#2979ff',
    '#03a9f4', '#01579b', '#00b0ff',
    '#00bcd4', '#006064', '#00e5ff',
    '#009688', '#004d40', '#1de9b6',
    '#4caf50', '#1b5e20', '#00e676',
    '#8bc34a', '#33691e', '#76ff03',
    '#cddc39', '#827717', '#c6ff00',
    '#ffeb3b', '#f57f17', '#ffea00',
    '#ffc107', '#FF6F00', '#ffc400',
    '#ff9800', '#e65100', '#ff9100',
    '#ff5722', '#bf360c', '#ff3d00',
    '#795548', '#3E2723',
    '#9e9e9e', '#212121',
    '#607d8b', '#263238',
  ];

  static readonly COLORS_RESERVED: Record<string, string> = {
    wallets: '#607d8b',
    default: '#607d8b',
  };

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
