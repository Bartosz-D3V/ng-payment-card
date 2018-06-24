import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';

import { CreditCardComponent } from './credit-card.component';
import { ICardDetails } from '@cc-project/lib/domain/ICardDetails';
import { CardDetails } from './domain/CardDetails';

describe('CreditCardComponent', () => {
  let component: CreditCardComponent;
  let fixture: ComponentFixture<CreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CreditCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate form', () => {
    expect(component.ccForm).toBeDefined();
  });

  describe('OnChanges', () => {
    it(
      'should emit form values when form was changed',
      fakeAsync(() => {
        let result: ICardDetails;
        component.formUpdated.subscribe((val: ICardDetails) => (result = val));
        const mockForm: ICardDetails = new CardDetails('Donnie Darko', null, null, null, null);
        component.ccForm.setValue(mockForm);
        tick();

        expect(result).toEqual(mockForm);
      })
    );
  });

  describe('ccForm', () => {
    afterEach(() => {
      component.ccForm.reset();
    });

    describe('cardNumber control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
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

      beforeAll(() => {
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
    });

    describe('expirationDay control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
        ctrl = component.ccForm.get('expirationDay');
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

      it('should be marked as invalid if contains less than 2 characters', () => {
        ctrl.setValue('3');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('minlength')).toBeTruthy();
      });

      it('should be marked as invalid if contains more than 2 characters', () => {
        ctrl.setValue('031');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if contains exactly 2 characters', () => {
        ctrl.setValue('03');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });
    });

    describe('expirationMonth control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
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

      it('should be marked as invalid if contains less than 2 characters', () => {
        ctrl.setValue('3');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('minlength')).toBeTruthy();
      });

      it('should be marked as invalid if contains more than 2 characters', () => {
        ctrl.setValue('031');

        expect(ctrl.valid).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeTruthy();
      });

      it('should be marked as valid if contains exactly 2 characters', () => {
        ctrl.setValue('03');

        expect(ctrl.valid).toBeTruthy();
        expect(ctrl.hasError('minlength')).toBeFalsy();
        expect(ctrl.hasError('maxlength')).toBeFalsy();
      });
    });

    describe('ccv control', () => {
      let ctrl: AbstractControl;

      beforeAll(() => {
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
  });
});
