import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CardValidator {
  private static NUMBERS_ONLY_ERR: ValidationErrors = {
    numbersOnly: true,
  };

  private static CHECKSUM_INVALID: ValidationErrors = {
    checksum: true,
  };

  public static numbersOnly(abstractCtrl: AbstractControl): ValidationErrors | null {
    const ccNum: string = abstractCtrl.value;
    const NUMBERS_ONLY: RegExp = new RegExp(/^[0-9]+$/);
    return !NUMBERS_ONLY.test(ccNum) ? CardValidator.NUMBERS_ONLY_ERR : null;
  }

  public static checksum(abstractCtr: AbstractControl): ValidationErrors | null {
    const ccNumber: string = abstractCtr.value;
    const luhnArray: Array<number> = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
    let length: number = ccNumber? ccNumber.length : 0;
    let sum = 0;
    let shouldMultiply = true;

    while (length) {
      const val: number = parseInt(ccNumber.charAt(--length), 10);
      sum += (shouldMultiply = !shouldMultiply) ? luhnArray[val] : val;
    }
    return !(sum && sum % 10 === 0) ? CardValidator.CHECKSUM_INVALID : null;
  }
}
