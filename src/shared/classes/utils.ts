export class Utils {

  /**
   * @returns A random item from the given list
   */
  static getRandomItemFromList<T>(list: T[]): T {
    return list[Math.floor(Math.random() * list.length)];
  }
}
