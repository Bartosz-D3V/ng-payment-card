import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validator/card-validator';
import { ICardDetails } from '@cc-project/lib/domain/ICardDetails';
import { CardDetails } from '@cc-project/lib/domain/CardDetails';
import { CardType } from '@cc-project/lib/domain/card-type';
import { CreditCardService } from '@cc-project/lib/service/credit-card.service';
import { Month } from '@cc-project/lib/domain/month.enum';

/**
 * NgCreditCard without any dependencies other then ReactiveFormsModule
 */
@Component({
  selector: 'ng-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  providers: [CreditCardService],
})
export class CreditCardComponent implements OnInit {
  /**
   * FormGroup available publicly
   */
  public ccForm: FormGroup;
  public months: Array<Month> = [];
  public years: Array<number> = [];

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

  @Input() public cardHolderTooLong? = 'Card holder name is too long';

  /**
   * Validation message for missing expiration month
   * @type {string} [expirationMonthMissingTxt] - Expiration month is required
   */
  @Input() public expirationMonthMissingTxt? = 'Expiration month is required';

  @Input() public expirationYearMissingTxt? = 'Expiration year is required';

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

  @Input() public cardExpired? = 'Card has expired';

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
   * Switch validation of the credit card expiration
   * @type {boolean} [validateCardExpiration] - true
   */

  @Input() public validateCardExpiration? = true;

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
   * @param {CreditCardService} _ccService
   */
  constructor(private _ccService: CreditCardService, private _fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
    this.assignDateValues();
  }

  private assignDateValues(): void {
    for (const key of Object.keys(Month)) {
      this.months.push(Month[key]);
    }
    const year = new Date().getFullYear();
    for (let i = -2; i < 5; i++) {
      this.years.push(year + i);
    }
  }

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

  public getCardType(ccNum: string): string | null {
    return CreditCardService.getCardType(ccNum);
  }

  public emitSavedCard(): void {
    const cardDetails: ICardDetails = <CardDetails>this.ccForm.value;
    this.formSaved.emit(cardDetails);
  }
}
