/**
 * Quick storage saver/loader that supports default value.
 */
export class InlineStorage {

  constructor(public key: string) {
  }

  /**
   * @returns Stored value from localStorage.
   */
  get value(): string {
    return localStorage.getItem(this.key);
  }

  /**
   * Set value to localStorage.
   */
  set value(value: string) {
    if (value) {
      localStorage.setItem(this.key, value);
    }
  }

  /**
   * @returns Get the stored value if there is one,
   * otherwise, return the given value.
   */
  getValue(defaultValue?: string): string {
    if (this.value) {
      return this.value;
    }
    return defaultValue;
  }
}
