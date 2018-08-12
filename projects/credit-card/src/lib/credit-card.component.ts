import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validator/card-validator';
import { ICardDetails } from '@cc-project/lib/domain/ICardDetails';
import { CardDetails } from '@cc-project/lib/domain/CardDetails';
import { CardType } from '@cc-project/lib/domain/card-type';
import { CreditCardService } from '@cc-project/lib/service/credit-card.service';
import { Month } from '@cc-project/lib/domain/month.enum';

@Component({
  selector: 'ng-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  providers: [CreditCardService],
})
export class CreditCardComponent implements OnInit {
  public ccForm: FormGroup;
  public months: Array<Month> = [];
  public years: Array<number> = [];

  @Input()
  public ccNumMissingTxt? = 'Card number is required';

  @Input()
  public ccNumTooShortTxt? = 'Card number is too short';

  @Input()
  public ccNumTooLongTxt? = 'Card number is too long';

  @Input()
  public ccNumContainsLettersTxt? = 'Card number can contain digits only';

  @Input()
  public ccNumChecksumInvalidTxt? = 'Provided card number is invalid';

  @Input()
  public cardHolderMissingTxt? = 'Card holder name is required';

  @Input()
  public cardHolderTooLong? = 'Card holder name is too long';

  @Input()
  public expirationMonthMissingTxt? = 'Expiration month is required';

  @Input()
  public expirationYearMissingTxt? = 'Expiration year is required';

  @Input()
  public ccvMissingTxt? = 'CCV number is required';

  @Input()
  public ccvNumTooShortTxt? = 'CCV number is too short';

  @Input()
  public ccvNumTooLongTxt? = 'CCV number is too long';

  @Input()
  public ccvContainsLettersTxt? = 'CCV number can contain digits only';

  @Input()
  public cardExpired? = 'Card has expired';

  @Input()
  public validateCCNum? = true;

  @Input()
  public validateCardHolder? = true;

  @Input()
  public validateExpirationMonth? = true;

  @Input()
  public validateExpirationYear? = true;

  @Input()
  public validateCardExpiration? = true;

  @Input()
  public validateCCV? = true;

  @Output()
  public formSaved: EventEmitter<ICardDetails> = new EventEmitter<CardDetails>();

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
