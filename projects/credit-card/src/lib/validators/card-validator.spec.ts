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

  describe('checksum method', () => {
    const expectedErr: ValidationErrors = {
      checksum: true,
    };

    it('should return null if the VISA credit card number passes luhn algorithm checker', () => {
      const cc1 = '4831334173681875';
      const cc2 = '4485400695865889';
      const cc3 = '4556705413750101610';
      const abstractCtrl: AbstractControl = new FormControl();

      abstractCtrl.setValue(cc1);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();

      abstractCtrl.setValue(cc2);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();

      // abstractCtrl.setValue(cc3);
      // expect(CardValidator.checksum(abstractCtrl)).toBeNull();
    });
  });
});
