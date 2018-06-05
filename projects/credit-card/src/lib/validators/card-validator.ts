import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CardValidator {
  private static readonly NUMBERS_ONLY: RegExp = new RegExp(/^[0-9]+$/);
  private static readonly NUMBERS_ONLY_ERR: ValidationErrors = {
    numbersOnly: true,
  };

  public static numbersOnly(abstractCtrl: AbstractControl): ValidationErrors | null {
    const ccNum: string = abstractCtrl.value;
    return !CardValidator.NUMBERS_ONLY.test(ccNum)
      ? CardValidator.NUMBERS_ONLY_ERR
      : null;
  }
}
