import { Component, EventEmitter, OnInit, Output, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validator/card-validator';
import { ICardDetails } from './domain/i-card-details';
import { CardDetails } from './domain/card-details';
import { PaymentCardService } from './service/payment-card.service';

/**
 * NgPaymentCard without any dependencies other then ReactiveFormsModule
 */
@Component({
  selector: 'ng-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentCardComponent implements OnInit {
  /**
   * FormGroup available publicly
   */
  public ccForm: FormGroup;

  /**
   * List of months
   */
  public months: Array<string> = [];

  /**
   * List of years
   */
  public years: Array<number> = [];

  /**
   * Validation message for missing payment card number
   */
  @Input()
  public ccNumMissingTxt? = 'Card number is required';

  /**
   * Validation message for too short payment card number
   */
  @Input()
  public ccNumTooShortTxt? = 'Card number is too short';

  /**
   * Validation message for too long payment card number
   */
  @Input()
  public ccNumTooLongTxt? = 'Card number is too long';

  /**
   * Validation message for payment card number that contains characters other than digits
   */
  @Input()
  public ccNumContainsLettersTxt? = 'Card number can contain digits only';

  /**
   * Validation message for invalid payment card  number (Luhn's validation)
   */
  @Input()
  public ccNumChecksumInvalidTxt? = 'Provided card number is invalid';

  /**
   * Validation message for missing card holder name
   */
  @Input()
  public cardHolderMissingTxt? = 'Card holder name is required';

  /**
   * Validation message for too long card holder name
   */
  @Input()
  public cardHolderTooLongTxt? = 'Card holder name is too long';

  /**
   * Validation message for missing expiration month
   */
  @Input()
  public expirationMonthMissingTxt? = 'Expiration month is required';

  /**
   * Validation message for missing expiration year
   */
  @Input()
  public expirationYearMissingTxt? = 'Expiration year is required';

  /**
   * Validation message for missing CCV number
   */
  @Input()
  public ccvMissingTxt? = 'CCV number is required';

  /**
   * Validation message for too short CCV number
   */
  @Input()
  public ccvNumTooShortTxt? = 'CCV number is too short';

  /**
   * Validation message for too long CCV number
   */
  @Input()
  public ccvNumTooLongTxt? = 'CCV number is too long';

  /**
   * Validation message for incorrect CCV number containing characters other than digits
   */
  @Input()
  public ccvContainsLettersTxt? = 'CCV number can contain digits only';

  /**
   * Validation message for expired card
   */
  @Input()
  public cardExpiredTxt? = 'Card has expired';

  /**
   * Switch validation of the payment card number
   */
  @Input()
  public validateCCNum? = true;

  /**
   * Switch validation of the payment card holder
   */
  @Input()
  public validateCardHolder? = true;

  /**
   * Switch validation of the payment card expiration month
   */
  @Input()
  public validateExpirationMonth? = true;

  /**
   * Switch validation of the payment card expiration year
   */
  @Input()
  public validateExpirationYear? = true;

  /**
   * Switch validation of the payment card expiration
   */
  @Input()
  public validateCardExpiration? = true;

  /**
   * Switch validation of the payment card CCV number
   */
  @Input()
  public validateCCV? = true;

  /**
   * EventEmitter for payment card object
   */
  @Output()
  public formSaved: EventEmitter<ICardDetails> = new EventEmitter<CardDetails>();

  constructor(private _ccService: PaymentCardService, private _fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
    this.assignDateValues();
  }

  /**
   * Populate months and years
   */
  private assignDateValues(): void {
    this.months = PaymentCardService.getMonths();
    this.years = PaymentCardService.getYears();
  }

  /**
   * Build reactive form
   */
  private buildForm(): void {
    this.ccForm = this._fb.group(
      {
        cardNumber: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(19),
            CardValidator.numbersOnly,
            CardValidator.checksum,
          ]),
        ],
        cardHolder: ['', Validators.compose([Validators.required, Validators.maxLength(22)])],
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required],
        ccv: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(4),
            CardValidator.numbersOnly,
          ]),
        ],
      },
      {
        validator: CardValidator.expiration,
      }
    );
  }

  /**
   * Returns payment card type based on payment card number
   */
  public getCardType(ccNum: string): string | null {
    return PaymentCardService.getCardType(ccNum);
  }

  /**
   * Callback function that emits payment card details after user clicks submit, or press enter
   */
  public emitSavedCard(): void {
    const cardDetails: ICardDetails = <CardDetails>this.ccForm.value;
    this.formSaved.emit(cardDetails);
  }
}
