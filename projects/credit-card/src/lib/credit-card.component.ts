import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validators/card-validator';
import { ICardDetails } from '@cc-project/lib/domain/ICardDetails';
import { CardDetails } from '@cc-project/lib/domain/CardDetails';
import { CardType } from '@cc-project/lib/domain/card-type';
import { default as CARD_TYPES, CardTypesContainer } from './domain/card-types';

/**
 * NgCreditCard without any dependencies other then ReactiveFormsModule
 */
@Component({
  selector: 'ng-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  /**
   * FormGroup available publicly
   */
  public ccForm: FormGroup;

  /**
   * Readonly card types container.
   * Contains list of card types as enum and list of regexps
   * @type {Map<CardType, RegExp>}
   */
  public readonly cardTypes: CardTypesContainer = CARD_TYPES;

  /**
   * Validation message for missing credit card number
   * @type {string} [ccNumMissingTxt] - Card number is required
   */
  @Input() public ccNumMissingTxt? = 'Card number is required';

  /**
   * Validation message for too short credit card number
   * @type {string} [ccNumTooShortTxt] - Card number is too short
   */
  @Input() public ccNumTooShortTxt? = 'Card number is too short';

  /**
   * Validation message for too long credit card number
   * @type {string} [ccNumTooLongTxt] - Card number is too long
   */
  @Input() public ccNumTooLongTxt? = 'Card number is too long';

  /**
   * Validation message for credit card number that contains characters other than digits
   * @type {string} [ccNumContainsLettersTxt] - Card number can contain digits only
   */
  @Input() public ccNumContainsLettersTxt? = 'Card number can contain digits only';

  /**
   * Validation message for invalid credit card  number (Luhn's validation)
   * @type {string} [ccNumChecksumInvalidTxt] - Provided card number is invalid
   */
  @Input() public ccNumChecksumInvalidTxt? = 'Provided card number is invalid';

  /**
   * Validation message for missing card holder name
   * @type {string} [cardHolderMissingTxt] - Card holder name is required
   */
  @Input() public cardHolderMissingTxt? = 'Card holder name is required';

  /**
   * Validation message for missing expiration day
   * @type {string} [expirationDayMissingTxt] - Expiration day is required
   */
  @Input() public expirationDayMissingTxt? = 'Expiration day is required';

  /**
   * Validation message for too short expiration day
   * @type {string} [expirationDayTooShortTxt] - Expiration day is too short
   */
  @Input() public expirationDayTooShortTxt? = 'Expiration day is too short';

  /**
   * Validation message for too long expiration day
   * @type {string} [expirationDayTooLongTxt] - Expiration day is too long
   */
  @Input() public expirationDayTooLongTxt? = 'Expiration day is too long';

  /**
   * Validation message for missing expiration month
   * @type {string} [expirationMonthMissingTxt] - Expiration month is required
   */
  @Input() public expirationMonthMissingTxt? = 'Expiration month is required';

  /**
   * Validation message for too short expiration month
   * @type {string} [expirationMonthTooShortTxt] - Expiration month is too short
   */
  @Input() public expirationMonthTooShortTxt? = 'Expiration month is too short';

  /**
   * Validation message for too long expiration month
   * @type {string} [expirationMonthTooLongTxt] - Expiration month is too long
   */
  @Input() public expirationMonthTooLongTxt? = 'Expiration month is too long';

  /**
   * Validation message for missing CCV number
   * @type {string} [ccvMissingTxt] - CCV number is required
   */
  @Input() public ccvMissingTxt? = 'CCV number is required';

  /**
   * Validation message for too short CCV number
   * @type {string} [ccvNumTooShortTxt] - CCV number is too short
   */
  @Input() public ccvNumTooShortTxt? = 'CCV number is too short';

  /**
   * Validation message for too long CCV number
   * @type {string} [ccvNumTooLongTxt] - CCV number is too long
   */
  @Input() public ccvNumTooLongTxt? = 'CCV number is too long';

  /**
   * Validation message for incorrect CCV number containing characters other than digits
   * @type {string} [ccvContainsLettersTxt] - CCV number can contain digits only
   */
  @Input() public ccvContainsLettersTxt? = 'CCV number can contain digits only';

  /**
   * Switch validation of the credit card number
   * @type {boolean} [validateCCNum] - true
   */
  @Input() public validateCCNum? = true;

  /**
   * Switch validation of the credit card holder
   * @type {boolean} [validateCardHolder] - true
   */
  @Input() public validateCardHolder? = true;

  /**
   * Switch validation of the credit card expiration day
   * @type {boolean} [validateExpirationDay] - true
   */
  @Input() public validateExpirationDay? = true;

  /**
   * Switch validation of the credit card expiration month
   * @type {boolean} [validateExpirationMonth] - true
   */
  @Input() public validateExpirationMonth? = true;

  /**
   * Switch validation of the credit card CCV number
   * @type {boolean} [validateCCV] - true
   */
  @Input() public validateCCV? = true;

  /**
   * EventEmitter for credit card object
   * @type {EventEmitter<CardDetails>}
   */
  @Output() public formSaved: EventEmitter<ICardDetails> = new EventEmitter<CardDetails>();

  /**
   * Constructor for component injecting FormBuilder from ReactiveFormsModule
   * @param {FormBuilder} _fb
   */
  constructor(private _fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.ccForm = this._fb.group({
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
      cardHolder: ['', Validators.compose([Validators.required])],
      expirationDay: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
      expirationMonth: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      ],
      ccv: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(4),
          CardValidator.numbersOnly,
        ]),
      ],
    });
  }

  public getCardType(cardTypes: CardTypesContainer, ccNum: string): CardType | null {
    for (const [key, val] of Array.from(cardTypes.entries())) {
      if (
        ccNum
          .split(' ')
          .join('')
          .match(val)
      ) {
        return key;
      }
    }
    return null;
  }

  public emitSavedCard(): void {
    const cardDetails: ICardDetails = <CardDetails>this.ccForm.value;
    this.formSaved.emit(cardDetails);
  }
}
