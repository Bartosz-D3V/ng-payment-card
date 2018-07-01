import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardValidator } from './validators/card-validator';
import { ICardDetails } from '@cc-project/lib/domain/ICardDetails';
import { CardDetails } from '@cc-project/lib/domain/CardDetails';

@Component({
  selector: 'ng-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {
  public ccForm: FormGroup;

  @Input() public ccNumMissingTxt? = 'Card number is required';

  @Input() public ccNumTooShortTxt? = 'Card number is too short';

  @Input() public ccNumTooLongTxt? = 'Card number is too long';

  @Input() public ccNumContainsLettersTxt? = 'Card number can contain digits only';

  @Input() public ccNumchecksumInvalidTxt? = 'Provided card number is invalid';

  @Input() public cardHolderMissingTxt? = 'Card holder name is required';

  @Input() public expirationDayMissingTxt? = 'Expiration day is required';

  @Input() public expirationDayTooShortTxt? = 'Expiration day is too short';

  @Input() public expirationDayTooLongTxt? = 'Expiration day is too long';

  @Input() public expirationMonthMissingTxt? = 'Expiration month is required';

  @Input() public expirationMonthTooShortTxt? = 'Expiration month is too short';

  @Input() public expirationMonthTooLongTxt? = 'Expiration month is too long';

  @Input() public ccvMissingTxt? = 'CCV number is required';

  @Input() public ccvNumTooShortTxt? = 'CCV number is too short';

  @Input() public ccvNumTooLongTxt? = 'CCV number is too long';

  @Input() public ccvContainsLettersTxt? = 'CCV number can contain digits only';

  @Input() public validateCCNum? = true;

  @Input() public validateCardHolder? = true;

  @Input() public validateExpirationDay? = true;

  @Input() public validateExpirationMonth? = true;

  @Input() public validateCCV? = true;

  @Output() public formSaved: EventEmitter<ICardDetails> = new EventEmitter<CardDetails>();

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

  public emitSavedCard(): void {
    const cardDetails: ICardDetails = <CardDetails>this.ccForm.value;
    this.formSaved.emit(cardDetails);
  }
}
