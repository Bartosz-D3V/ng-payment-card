import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/**
 * Collection of validation methods
 */
export class CardValidator {
  /**
   * Custom error for alphanumeric input
   */
  private static NUMBERS_ONLY_ERR: ValidationErrors = {
    numbersOnly: true,
  };

  /**
   * Custom error for invalid checksum
   */
  private static CHECKSUM_INVALID: ValidationErrors = {
    checksum: true,
  };

  /**
   * Custom error for expired card
   */
  private static CARD_EXPIRED: ValidationErrors = {
    expiration: true,
  };

  /**
   * Check if control contains numbers only
   */
  public static numbersOnly(abstractCtrl: AbstractControl): ValidationErrors | null {
    const ccNum: string = abstractCtrl.value;
    const NUMBERS_ONLY: RegExp = new RegExp(/^[0-9]+$/);
    return !NUMBERS_ONLY.test(ccNum) ? CardValidator.NUMBERS_ONLY_ERR : null;
  }

  /**
   * Check checksum number in card number using Luhn algorithm
   */
  public static checksum(abstractCtr: AbstractControl): ValidationErrors | null {
    const ccNumber: string = abstractCtr.value;
    const luhnArray: Array<number> = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    let length: number = ccNumber ? ccNumber.length : 0;
    let sum = 0;
    let shouldMultiply = true;

    while (length) {
      const val: number = parseInt(ccNumber.charAt(--length), 10);
      sum += (shouldMultiply = !shouldMultiply) ? luhnArray[val] : val;
    }
    return !(sum && sum % 10 === 0) ? CardValidator.CHECKSUM_INVALID : null;
  }

  /**
   * Check validity of the card
   */
  public static expiration(formGroup: FormGroup): ValidationErrors | null {
    const expirationMonth: number = Number(formGroup.get('expirationMonth').value);
    const expirationYear: number = Number(formGroup.get('expirationYear').value);
    const expirationDate: Date = new Date(expirationYear, expirationMonth + 1, 0);
    return new Date().getTime() > expirationDate.getTime() ? CardValidator.CARD_EXPIRED : null;
  }
}
