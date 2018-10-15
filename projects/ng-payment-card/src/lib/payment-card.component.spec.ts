import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, async } from '@angular/core/testing';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { PaymentCardComponent } from './payment-card.component';
import { ICardDetails } from '@cc-project/lib/domain/i-card-details';
import { PaymentCardService } from '@cc-project/lib/service/payment-card.service';
import { PaymentCardNumberPipe } from '@cc-project/lib/pipe/payment-card-number/payment-card-number.pipe';
import { ValidThruPipe } from '@cc-project/lib/pipe/valid-thru/valid-thru.pipe';

describe('PaymentCardComponent', () => {
  let component: PaymentCardComponent;
  let fixture: ComponentFixture<PaymentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule],
      declarations: [PaymentCardComponent, PaymentCardNumberPipe, ValidThruPipe],
      providers: [PaymentCardService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate form', () => {
    expect(component.ccForm).toBeDefined();
  });

  describe('ccForm', () => {
    afterEach(() => {
      component.ccForm.reset();
    });

    describe('cardNumber control', () => {
      let ctrl: AbstractControl;

      beforeEach(() => {
        ctrl = component.ccForm.get('cardNumber');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if contains null', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
        expect(ctrl.hasError('checksum')).toBeTruthy();
      });

      it('should be marked as valid if contains value', () => {
        ctrl.setValue('5362427769465507');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('required')).toBeFalsy();
      });

      it('should be marked as invalid if contains less than 12 digits', () => {
        ctrl.setValue('12345678901');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('minlength')).toBeTruthy();
      });

      it('should be marked as invalid if contains more than 19 digits', () => {
        ctrl.setValue('12345678901234567891');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if contains between 12 and 19 digits', () => {
        ctrl.setValue('4831334173681875');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });

      it('should be marked as invalid if contains alphabet characters', () => {
        ctrl.setValue('12345AB912345');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('numbersOnly')).toBeTruthy();
      });

      it('should be marked as valid if contains numerical value', () => {
        ctrl.setValue('4485400695865889');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('numbersOnly')).toBeFalsy();
      });

      it('should be marked as invalid if checksum is not valid', () => {
        ctrl.setValue('4539883773969761462');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('checksum')).toBeTruthy();
      });

      it('should be marked as valid if checksum is valid', () => {
        ctrl.setValue('4556705413750101610');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('checksum')).toBeFalsy();
      });
    });

    describe('cardHolder control', () => {
      let ctrl: AbstractControl;

      beforeEach(() => {
        ctrl = component.ccForm.get('cardHolder');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if is empty', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
      });

      it('should be marked as valid if is not empty', () => {
        ctrl.setValue('Donnie Jr Darko');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('required')).toBeFalsy();
      });

      it('should be marked as invalid if greater than 22 characters', () => {
        ctrl.setValue('Mister Doctor Donnie Junior Darko The First');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if less than 22 characters', () => {
        ctrl.setValue('Donnie Darko');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });
    });

    describe('expirationYear control', () => {
      let ctrl: AbstractControl;

      beforeEach(() => {
        ctrl = component.ccForm.get('expirationYear');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if is empty', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
      });

      it('should be marked as valid if is not empty', () => {
        ctrl.setValue('03');

        expect(ctrl.valid).toBeTruthy();
      });
    });

    describe('expirationMonth control', () => {
      let ctrl: AbstractControl;

      beforeEach(() => {
        ctrl = component.ccForm.get('expirationMonth');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if is empty', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
      });

      it('should be marked as valid if is not empty', () => {
        ctrl.setValue('03');

        expect(ctrl.valid).toBeTruthy();
      });
    });

    describe('ccv control', () => {
      let ctrl: AbstractControl;

      beforeEach(() => {
        ctrl = component.ccForm.get('ccv');
      });

      afterEach(() => {
        ctrl.reset();
      });

      it('should be marked as invalid if is empty', () => {
        ctrl.setValue(null);

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('required')).toBeTruthy();
      });

      it('should be marked as valid if is not empty', () => {
        ctrl.setValue('123');

        expect(ctrl.valid).toBeTruthy();
      });

      it('should be marked as invalid if contains less than 3 characters', () => {
        ctrl.setValue('12');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('minlength')).toBeTruthy();
      });

      it('should be marked as invalid if contains more than 4 characters', () => {
        ctrl.setValue('12345');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if contains exactly 3 or 4 characters', () => {
        ctrl.setValue('123');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();

        ctrl.setValue('1234');
        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });

      it('should be marked as invalid if contains alphabet characters', () => {
        ctrl.setValue('12A3');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('numbersOnly')).toBeTruthy();
      });

      it('should be marked as valid if contains digits only', () => {
        ctrl.setValue('1234');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('numbersOnly')).toBeFalsy();
      });
    });

    describe('expiration validator', () => {
      let formGroup: FormGroup;

      beforeEach(() => {
        formGroup = component.ccForm;
      });

      afterEach(() => {
        formGroup.reset();
      });

      it('should be marked as invalid if card is expired', () => {
        formGroup.get('expirationMonth').setValue('06');
        formGroup.get('expirationYear').setValue('2015');

        expect(formGroup.valid).toBeFalsy();
        expect(formGroup.hasError('expiration')).toBeTruthy();
      });

      it('should be marked as valid if card is not expired', () => {
        formGroup.get('expirationMonth').setValue(new Date().getMonth() + 1);
        formGroup.get('expirationYear').setValue(new Date().getFullYear());

        expect(formGroup.hasError('expiration')).toBeFalsy();
      });
    });
  });

  describe('emitSavedCard', () => {
    it('should emit saved form', fakeAsync(() => {
      let result: ICardDetails;
      component.formSaved.subscribe((val: ICardDetails) => (result = val));
      const exampleCard: ICardDetails = {
        cardNumber: '123456789101',
        cardHolder: 'Donnie Darko',
        expirationYear: '05',
        expirationMonth: '123',
        ccv: 123,
      };
      component.ccForm.setValue(exampleCard);
      component.emitSavedCard();

      expect(result).toBeDefined();
      expect(result).toEqual(exampleCard);
    }));
  });

  describe('properties', () => {
    describe('ccNumMissingTxt', () => {
      afterEach(() => {
        component.ccNumMissingTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumMissingTxt = 'Example text';

        expect(component.ccNumMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumMissingTxt).toEqual('Card number is required');
      });
    });

    describe('ccNumTooShortTxt', () => {
      afterEach(() => {
        component.ccNumTooShortTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumTooShortTxt = 'Example text';

        expect(component.ccNumTooShortTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumTooShortTxt).toEqual('Card number is too short');
      });
    });

    describe('ccNumTooLongTxt', () => {
      afterEach(() => {
        component.ccNumTooLongTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumTooLongTxt = 'Example text';

        expect(component.ccNumTooLongTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumTooLongTxt).toEqual('Card number is too long');
      });
    });

    describe('ccNumContainsLettersTxt', () => {
      afterEach(() => {
        component.ccNumContainsLettersTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumContainsLettersTxt = 'Example text';

        expect(component.ccNumContainsLettersTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumContainsLettersTxt).toEqual('Card number can contain digits only');
      });
    });

    describe('ccNumChecksumInvalidTxt', () => {
      afterEach(() => {
        component.ccNumChecksumInvalidTxt = null;
      });

      it('should accept string value', () => {
        component.ccNumChecksumInvalidTxt = 'Example text';

        expect(component.ccNumChecksumInvalidTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccNumChecksumInvalidTxt).toEqual('Provided card number is invalid');
      });
    });

    describe('ccNumChecksumInvalidTxt', () => {
      afterEach(() => {
        component.cardHolderMissingTxt = null;
      });

      it('should accept string value', () => {
        component.cardHolderMissingTxt = 'Example text';

        expect(component.cardHolderMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.cardHolderMissingTxt).toEqual('Card holder name is required');
      });
    });

    describe('cardHolderTooLongTxt', () => {
      afterEach(() => {
        component.cardHolderTooLongTxt = null;
      });

      it('should accept string value', () => {
        component.cardHolderTooLongTxt = 'Example text';

        expect(component.cardHolderTooLongTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.cardHolderTooLongTxt).toEqual('Card holder name is too long');
      });
    });

    describe('expirationYearMissingTxt', () => {
      afterEach(() => {
        component.expirationYearMissingTxt = null;
      });

      it('should accept string value', () => {
        component.expirationYearMissingTxt = 'Example text';

        expect(component.expirationYearMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.expirationYearMissingTxt).toEqual('Expiration year is required');
      });
    });

    describe('expirationMonthMissingTxt', () => {
      afterEach(() => {
        component.expirationMonthMissingTxt = null;
      });

      it('should accept string value', () => {
        component.expirationMonthMissingTxt = 'Example text';

        expect(component.expirationMonthMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.expirationMonthMissingTxt).toEqual('Expiration month is required');
      });
    });

    describe('cardExpiredTxt', () => {
      afterEach(() => {
        component.cardExpiredTxt = null;
      });

      it('should accept string value', () => {
        component.cardExpiredTxt = 'Example text';

        expect(component.cardExpiredTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.cardExpiredTxt).toEqual('Card has expired');
      });
    });

    describe('ccvMissingTxt', () => {
      afterEach(() => {
        component.ccvMissingTxt = null;
      });

      it('should accept string value', () => {
        component.ccvMissingTxt = 'Example text';

        expect(component.ccvMissingTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccvMissingTxt).toEqual('CCV number is required');
      });
    });

    describe('ccvNumTooShortTxt', () => {
      afterEach(() => {
        component.ccvNumTooShortTxt = null;
      });

      it('should accept string value', () => {
        component.ccvNumTooShortTxt = 'Example text';

        expect(component.ccvNumTooShortTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccvNumTooShortTxt).toEqual('CCV number is too short');
      });
    });

    describe('ccvNumTooLongTxt', () => {
      afterEach(() => {
        component.ccvNumTooLongTxt = null;
      });

      it('should accept string value', () => {
        component.ccvNumTooLongTxt = 'Example text';

        expect(component.ccvNumTooLongTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccvNumTooLongTxt).toEqual('CCV number is too long');
      });
    });

    describe('ccvContainsLettersTxt', () => {
      afterEach(() => {
        component.ccvContainsLettersTxt = null;
      });

      it('should accept string value', () => {
        component.ccvContainsLettersTxt = 'Example text';

        expect(component.ccvContainsLettersTxt).toEqual('Example text');
      });

      it('should have default value', () => {
        expect(component.ccvContainsLettersTxt).toEqual('CCV number can contain digits only');
      });
    });

    describe('validateCCNum', () => {
      afterEach(() => {
        component.validateCCNum = null;
      });

      it('should accept boolean value', () => {
        component.validateCCNum = false;

        expect(component.validateCCNum).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCCNum).toBeTruthy();
      });
    });

    describe('validateCCNum', () => {
      afterEach(() => {
        component.validateCCNum = null;
      });

      it('should accept boolean value', () => {
        component.validateCCNum = false;

        expect(component.validateCCNum).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCCNum).toBeTruthy();
      });
    });

    describe('validateCardHolder', () => {
      afterEach(() => {
        component.validateCardHolder = null;
      });

      it('should accept boolean value', () => {
        component.validateCardHolder = false;

        expect(component.validateCardHolder).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCardHolder).toBeTruthy();
      });
    });

    describe('validateExpirationYear', () => {
      afterEach(() => {
        component.validateExpirationYear = null;
      });

      it('should accept boolean value', () => {
        component.validateExpirationYear = false;

        expect(component.validateExpirationYear).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateExpirationYear).toBeTruthy();
      });
    });

    describe('validateExpirationMonth', () => {
      afterEach(() => {
        component.validateExpirationMonth = null;
      });

      it('should accept boolean value', () => {
        component.validateExpirationMonth = false;

        expect(component.validateExpirationMonth).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateExpirationMonth).toBeTruthy();
      });
    });

    describe('validateCardExpiration', () => {
      afterEach(() => {
        component.validateCardExpiration = null;
      });

      it('should accept boolean value', () => {
        component.validateCardExpiration = false;

        expect(component.validateCardExpiration).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCardExpiration).toBeTruthy();
      });
    });

    describe('validateCCV', () => {
      afterEach(() => {
        component.validateCCV = null;
      });

      it('should accept boolean value', () => {
        component.validateCCV = false;

        expect(component.validateCCV).toBeFalsy();
      });

      it('should have default true value', () => {
        expect(component.validateCCV).toBeTruthy();
      });
    });
  });
});
