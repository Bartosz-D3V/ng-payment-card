import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

import { CardValidator } from './card-validator';

describe('CardValidator', () => {
  it('should be created', () => {
    expect(CardValidator).toBeTruthy();
  });

  describe('numbersOnly method', () => {
    const expectedErr: ValidationErrors = {
      numbersOnly: true,
    };

    it('should return null if control value contains only numbers', () => {
      const mockText1 = 123;
      const abstractCtrl: AbstractControl = new FormControl();

      abstractCtrl.setValue(mockText1);
      expect(CardValidator.numbersOnly(abstractCtrl)).toBeNull();
    });

    it('should return null if control value contains only numbers as string', () => {
      const mockText1 = '0901223';
      const abstractCtrl: AbstractControl = new FormControl();

      abstractCtrl.setValue(mockText1);
      expect(CardValidator.numbersOnly(abstractCtrl)).toBeNull();
    });

    it('should return NUMBERS_ONLY_ERR if control value contains alphabet characters', () => {
      const mockInvalidText1 = '12AB23';
      const abstractCtrl: AbstractControl = new FormControl();

      abstractCtrl.setValue(mockInvalidText1);
      expect(CardValidator.numbersOnly(abstractCtrl)).toEqual(expectedErr);
    });
  });
});
