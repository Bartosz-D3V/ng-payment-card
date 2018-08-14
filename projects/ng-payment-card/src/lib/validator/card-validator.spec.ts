import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

import { CardValidator } from './card-validator';

describe('CardValidator', () => {
  it('should be created', () => {
    expect(CardValidator).toBeTruthy();
  });

  let abstractCtrl: AbstractControl;

  beforeAll(() => {
    abstractCtrl = new FormControl();
  });

  afterEach(() => {
    abstractCtrl.reset();
  });

  describe('numbersOnly method', () => {
    const expectedErr: ValidationErrors = {
      numbersOnly: true,
    };

    it('should return null if control value contains only numbers', () => {
      const mockText1 = 123;

      abstractCtrl.setValue(mockText1);
      expect(CardValidator.numbersOnly(abstractCtrl)).toBeNull();
    });

    it('should return null if control value contains only numbers as string', () => {
      const mockText1 = '0901223';

      abstractCtrl.setValue(mockText1);
      expect(CardValidator.numbersOnly(abstractCtrl)).toBeNull();
    });

    it('should return NUMBERS_ONLY_ERR if control value contains alphabet characters', () => {
      const mockInvalidText1 = '12AB23';

      abstractCtrl.setValue(mockInvalidText1);
      expect(CardValidator.numbersOnly(abstractCtrl)).toEqual(expectedErr);
    });
  });

  describe('checksum method', () => {
    const expectedErr: ValidationErrors = {
      checksum: true,
    };

    it('should return null if the payment card number passes luhn algorithm checker', () => {
      const ccNum1 = '4831334173681875';
      const ccNum2 = '4485400695865889';
      const ccNum3 = '4556705413750101610';
      const ccNum4 = '4539883773969761482';
      const ccNum5 = '5322540118114060';
      const ccNum6 = '5404555568860708';
      const ccNum7 = '5362427769465507';

      abstractCtrl.setValue(ccNum1);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();

      abstractCtrl.setValue(ccNum2);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();

      abstractCtrl.setValue(ccNum3);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();

      abstractCtrl.setValue(ccNum4);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();

      abstractCtrl.setValue(ccNum5);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();

      abstractCtrl.setValue(ccNum6);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();

      abstractCtrl.setValue(ccNum7);
      expect(CardValidator.checksum(abstractCtrl)).toBeNull();
    });

    it('should return checksum error if the payment card number is null', () => {
      abstractCtrl.setValue(null);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);
    });

    it('should return checksum error if the payment card number is undefined', () => {
      abstractCtrl.setValue(undefined);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);
    });

    it('should return checksum error if the payment card number does not pass luhn algorithm checker', () => {
      const ccNum1 = '4831334173681874';
      const ccNum2 = '44854106958658810';
      const ccNum3 = '4556705413750101620';
      const ccNum4 = '4539883773969761462';
      const ccNum5 = '5322540119114060';
      const ccNum6 = '5404555561860738';
      const ccNum7 = '5362427768465502';

      abstractCtrl.setValue(ccNum1);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);

      abstractCtrl.setValue(ccNum2);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);

      abstractCtrl.setValue(ccNum3);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);

      abstractCtrl.setValue(ccNum4);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);

      abstractCtrl.setValue(ccNum5);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);

      abstractCtrl.setValue(ccNum6);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);

      abstractCtrl.setValue(ccNum7);
      expect(CardValidator.checksum(abstractCtrl)).toEqual(expectedErr);
    });
  });

  describe('expiration method', () => {
    let formGroup: FormGroup;

    beforeAll(() => {
      formGroup = new FormGroup({ expirationMonth: new FormControl(), expirationYear: new FormControl() });
    });

    afterEach(() => {
      formGroup.reset();
    });

    const CARD_EXPIRED: ValidationErrors = {
      expiration: true,
    };

    it('should return error if card has expired', () => {
      formGroup.get('expirationMonth').setValue('06');
      formGroup.get('expirationYear').setValue('2015');

      expect(CardValidator.expiration(formGroup)).toEqual(CARD_EXPIRED);
    });

    it('should return null if card is not expired', () => {
      formGroup.get('expirationMonth').setValue(new Date().getMonth() + 1);
      formGroup.get('expirationYear').setValue(new Date().getFullYear());

      expect(CardValidator.expiration(formGroup)).toBeNull();
    });
  });
});
